package com.electrowaveselectronics.inventorymanagement.service;

import com.electrowaveselectronics.inventorymanagement.entity.GodownHead;
import com.electrowaveselectronics.inventorymanagement.repository.GodownHeadRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@Service
public class LoginService {
    @Autowired
    GodownHeadRepository godownHeadRepository;

    @Autowired
    GodownHeadService  godownHeadService;

    @Autowired
    AuthService authService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> login(String username, String password, HttpServletResponse response) throws Exception {
        try {
            if (username == null || password == null) {
                Map<String, String> result = new HashMap<>();
                result.put("error", "Both username and password are required.");
                return ResponseEntity.badRequest().body(result);
            }

            if (!isValidUsername(username)) {
                Map<String, String> result = new HashMap<>();
                result.put("message", "Invalid username format. " +
                        "Should not start with any special char or numeric value, " +
                        "Should not contain whitespace");
                return ResponseEntity.badRequest().body(result);
            }

            GodownHead godownHead = godownHeadRepository.findByUsername(username);

            if(godownHead == null){
                Map<String, String> result = new HashMap<>();
                result.put("message", "User does not exist");
                return ResponseEntity.badRequest().body(result);

            }

            if (validatePassword(godownHead, password)) {
                // Successful login, set a cookie
                Cookie  cookie = generateUserCookie(username);
                response.addCookie(cookie);
                response.setHeader("Authorization", "Bearer " + cookie.getValue());

                // Create and store Auth object
                authService.createAuthInfo(username, cookie.getValue());
                Map<String, String> result = new HashMap<>();
                result.put("message", "Successfully login.");
                result.put("cookie", cookie.getValue());
                result.put("username", godownHead.getUsername());
                result.put("godownId", String.valueOf(godownHead.getGodownId()));
                result.put("godownHeadId", String.valueOf(godownHead.getGodownHeadId()));
                result.put("role", godownHead.getRole().name());

                System.out.println(cookie);
                return ResponseEntity.accepted().body(result);
            } else {
                Map<String, String> result = new HashMap<>();
                result.put("message", "Login failed");
                return ResponseEntity.badRequest().body(result);
            }
        }
        catch (Exception e){
            throw e;
        }
    }

    private boolean isValidUsername(String username) {
        // Check for whitespace, and username not starting with a numeric value or special character
        return !Pattern.compile("\\s").matcher(username).find() &&
                !Character.isDigit(username.charAt(0)) &&
                !Pattern.compile("[^a-zA-Z0-9]").matcher(username).find();
    }

    private boolean validatePassword(GodownHead godownHead, String password) {
        // Add your password validation logic here
        return passwordEncoder.matches(password, godownHead.getPassword());
    }

    private Cookie generateUserCookie(String username) {
        String secretKey = "secret";
        String data = username + System.currentTimeMillis() + secretKey;
        String token = generateToken(data);
        Cookie cookie = new Cookie("token", token);
        cookie.setMaxAge(3600); // Cookie expiry time in seconds i.e. 1 hour
        cookie.setPath("/");
//        cookie.setSecure(true);
//        cookie.setHttpOnly(true);
        return cookie;
    }

    private String generateToken(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");

            byte[] hash = digest.digest(data.getBytes());

            String encodedHash = Base64.getUrlEncoder().encodeToString(hash);

            return encodedHash;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

    public ResponseEntity<?> logout(HttpServletResponse response, String username) throws Exception {
        try{
            if (!username.isEmpty()) {
                Cookie cookie = generateUserCookie(username);
                cookie.setMaxAge(0);
                authService.createAuthInfo(username, cookie.toString());
                HttpHeaders headers = new HttpHeaders();
                headers.setCacheControl(CacheControl.noStore());

                return ResponseEntity.ok("Logout successful for user: " + username);
            } else {
                return ResponseEntity.badRequest().body("User not logged in.");
            }
        }
        catch (Exception e){
            throw e;
        }
    }

    public ResponseEntity<?> register(String username, String password, String GodownHeadName, String email, String godownheadNo, int GodownId) {
        if (username == null || password == null || GodownHeadName == null || email==null || godownheadNo==null || GodownId<=0) {
            return ResponseEntity.badRequest().body("Username, password, and GodownHeadName cannot be null or empty");
        }

        if (!isValidUsername(username)) {
            return ResponseEntity.badRequest().body("Invalid username format. " +
                    "Should not start with any special char or numeric value, " +
                    "Should not contain whitespace");
        }

        if (godownHeadRepository.findByUsername(username)!=null) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        String hashedPassword = passwordEncoder.encode(password);
        GodownHead newGodownHead = godownHeadService.registerGodownHead(username, hashedPassword, GodownHeadName,email,godownheadNo, GodownId);

        Cookie cookie = generateUserCookie(username);

        authService.createAuthInfo(newGodownHead.getUsername(), cookie.getValue());

        return ResponseEntity.ok("Registration successful");
    }


    public ResponseEntity<?> registerAdmin(String username, String password, String GodownHeadName, String email, String godownheadNo) {
        if (username == null || password == null || GodownHeadName == null || email==null || godownheadNo==null) {
            return ResponseEntity.badRequest().body("Username, password, and GodownHeadName cannot be null or empty");
        }

        if (!isValidUsername(username)) {
            return ResponseEntity.badRequest().body("Invalid username format. " +
                    "Should not start with any special char or numeric value, " +
                    "Should not contain whitespace");
        }

        if (godownHeadRepository.findByUsername(username)!=null) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        String hashedPassword = passwordEncoder.encode(password);
        GodownHead newGodownHead = godownHeadService.registerAdmin(username, hashedPassword, GodownHeadName, email,godownheadNo);

        Cookie cookie = generateUserCookie(username);

        authService.createAuthInfo(newGodownHead.getUsername(), cookie.getValue());

        return ResponseEntity.ok("Admin registeration successful");
    }
}
