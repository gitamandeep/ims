package com.electrowaveselectronics.inventorymanagement.controller;

import com.electrowaveselectronics.inventorymanagement.service.AuthService;
import com.electrowaveselectronics.inventorymanagement.service.LoginService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
public class LoginController {
    @Autowired
    LoginService loginService;

    @Autowired
    AuthService authService;

    @PostMapping("/api/login")
    @ResponseBody
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest, HttpServletResponse response) {
        try {
            String username = loginRequest.get("username");
            String password = loginRequest.get("password");
            return loginService.login(username, password, response);
        }
        catch (Exception e){
            return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletResponse response, @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = extractTokenFromAuthorizationHeader(authorizationHeader);
            String username = authService.findUsernameByToken(token);
            if(!Objects.isNull(username)){
                return loginService.logout(response, username);
            }
            return new ResponseEntity<>("User not Logged in", HttpStatus.BAD_REQUEST);
        }
        catch (Exception e){
            return new ResponseEntity<>("Somehing went wrong ... "+ e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> register(@RequestBody Map<String,String> request) {
        try {
            String username = request.get("username");
            String password = request.get("password");
            String godownHeadName = request.get("godownHeadName");
            String email=request.get("email");
            String godownheadNo=request.get("godownHeadNo");
            String godownId = request.get("godownId");
            int parsedGodownId = Integer.parseInt(godownId);
            return loginService.register(username, password, godownHeadName,email,godownheadNo, parsedGodownId);
        }
        catch (Exception e){
            return new ResponseEntity<>("Somehing went wrong ... "+ e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String extractTokenFromAuthorizationHeader(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }

}