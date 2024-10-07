package com.electrowaveselectronics.inventorymanagement.service;

import com.electrowaveselectronics.inventorymanagement.entity.GodownHead;
import com.electrowaveselectronics.inventorymanagement.repository.AuthRepository;
import com.electrowaveselectronics.inventorymanagement.repository.GodownHeadRepository;
import com.electrowaveselectronics.inventorymanagement.util.EnumRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class GodownHeadService {

    @Autowired
    public AuthRepository authRepository;


    public GodownHeadRepository godownHeadRepository;

    @Autowired
    public GodownHeadService(GodownHeadRepository godownHeadRepository) {
        this.godownHeadRepository = godownHeadRepository;
    }


    public GodownHead save(GodownHead theGodownHead) {
        try {
            GodownHead savedGodownHead = godownHeadRepository.save(theGodownHead);
            return savedGodownHead;
        } catch (Exception e){
            throw e;
        }

    }

    public GodownHead getGodownHead(int GodownHeadId) throws Exception {
        try {
            GodownHead u = godownHeadRepository.findById(GodownHeadId).get();
            return u;
        } catch (Exception e) {
            throw e;
        }
    }

    public List<GodownHead> findAll() throws Exception {
        try {
            return godownHeadRepository.findAll();

        }catch (Exception e){
            throw e;
        }

    }

    public GodownHead getGodownHeadByGodownHeadId(int GodownHeadId) throws Exception {
        try {
            Optional<GodownHead> GodownHead = godownHeadRepository.findById(GodownHeadId);
            return GodownHead.get();
        } catch (Exception e) {
            throw e;
        }
    }

    public GodownHead updateGodownHead(GodownHead theGodownHead) {
        try {
            Optional<Integer> optional = Optional.of(theGodownHead.getGodownHeadId());
            if (optional.isEmpty()) {
                throw new Exception("GodownHead id is not provided in input, please try again");
            }
            GodownHead existingGodownHead = godownHeadRepository.findById(theGodownHead.getGodownHeadId()).orElseThrow(() -> new Exception("GodownHead not found for provided id"));

            if (theGodownHead.getGodownHeadName() != null) {
                existingGodownHead.setGodownHeadName(theGodownHead.getGodownHeadName());
            }

            if (theGodownHead.getPassword() != null) {
                existingGodownHead.setPassword(theGodownHead.getPassword());
            }

            if (theGodownHead.getRole() != null) {
                existingGodownHead.setRole(theGodownHead.getRole());
            }

            if (theGodownHead.getAddress() != null) {
                existingGodownHead.setAddress(theGodownHead.getAddress());
            }

            return godownHeadRepository.save(existingGodownHead);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String setGodownHead(GodownHead theGodownHead) {
        try {
            Integer godownHeadId = theGodownHead.getGodownHeadId();
            if (godownHeadId == null) {
                throw new Exception("Customer id not provided in input, please try again");
            }

            Optional<GodownHead> optionalGodownHead = godownHeadRepository.findById(theGodownHead.getGodownHeadId());

            if (optionalGodownHead.isPresent()) {
                // Updating an existing customer
                GodownHead existingGodownHead = optionalGodownHead.get();

                if (theGodownHead.getGodownHeadName() != null) {
                    GodownHead duplicateGodownHead = godownHeadRepository.findByName(theGodownHead.getGodownHeadName());
                    if (duplicateGodownHead != null && !(duplicateGodownHead.getGodownHeadId() == (theGodownHead.getGodownHeadId()))) {
                        throw new Exception("A customer with the same name already exists");
                    }
                    existingGodownHead.setGodownHeadName(theGodownHead.getGodownHeadName());
                }
                if (theGodownHead.getGodownheadNo() != null) {
                    GodownHead duplicateGodownHead = godownHeadRepository.findByContactNumber(theGodownHead.getGodownheadNo());
                    if (duplicateGodownHead != null && !(duplicateGodownHead.getGodownHeadId() == (theGodownHead.getGodownHeadId()))) {
                        throw new Exception("A customer with the same contact number already exists");
                    }

                    if (!theGodownHead.getGodownheadNo().matches("\\d{10}")) {
                        throw new Exception("Invalid contact number. It should be a 10-digit numeric value.");
                    }
                    existingGodownHead.setGodownheadNo(theGodownHead.getGodownheadNo());
                }
//                if (theGodownHead.getCustomerAddress() != null) {
//                    Customer duplicateCustomer = customerRepository.findByAddress(theCustomer.getCustomerAddress());
//                    if (duplicateCustomer != null && !(duplicateCustomer.getCustomerId() == (theCustomer.getCustomerId()))) {
//                        throw new Exception("A customer with the same address already exists");
//                    }
//                    existingCustomer.setCustomerAddress(theCustomer.getCustomerAddress());
//                }
                GodownHead updatedGodownHead = godownHeadRepository.save(existingGodownHead);
                return "GodownHead updated with id: " + updatedGodownHead.getGodownHeadId();
            } else {
                // Adding a new GodownHead
                if (theGodownHead.getGodownHeadName() != null) {
                    GodownHead duplicateGodownHead = godownHeadRepository.findByName(theGodownHead.getGodownHeadName());
                    if (duplicateGodownHead != null) {
                        throw new Exception("A GodownHead with the same name already exists");
                    }
                }
                if (theGodownHead.getGodownheadNo() != null) {
                    GodownHead duplicateGodownHead = godownHeadRepository.findByContactNumber(theGodownHead.getGodownheadNo());
                    if (duplicateGodownHead != null) {
                        throw new Exception("A GodownHead with the same contact number already exists");
                    }

                    if (!theGodownHead.getGodownheadNo().matches("\\d{10}")) {
                        throw new Exception("Invalid contact number. It should be a 10-digit numeric value.");
                    }
                }
//                if (theCustomer.getCustomerAddress() != null) {
//                    Customer duplicateCustomer = customerRepository.findByAddress(theCustomer.getCustomerAddress());
//                    if (duplicateCustomer != null) {
//                        throw new Exception("A customer with the same address already exists");
//                    }
//                }
                GodownHead newGodownHead = godownHeadRepository.save(theGodownHead);
                return "New GodownHead added with id: " + newGodownHead.getGodownHeadId();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public HashMap<String, String> loginwithPassword(String username, String password) {
        HashMap<String, String> result = new HashMap<>();
        try {
            GodownHead godownHead = godownHeadRepository.findByUsername(username);
            if (godownHead != null && godownHead.getPassword().equals(password)) {
                result.put("success", "Successfully logged in");
            } else {
                result.put("error", "Invalid username or password");
            }
        } catch (Exception e) {
            throw e;
        }
        return result;
    }

    public boolean isUsernameTaken(String username) {
        return godownHeadRepository.findByUsername(username) != null;
    }

    public GodownHead registerGodownHead(String username, String password, String godownHeadName, String email, String godownheadNo, int GodownId) {
        if (isUsernameTaken(username)) {
            throw new IllegalArgumentException("Username already taken");
        }

        GodownHead newGodownHead = new GodownHead();
        newGodownHead.setUsername(username);
        newGodownHead.setPassword(password);
        newGodownHead.setGodownHeadName(godownHeadName);
        newGodownHead.setGodownheadNo(godownheadNo);
        newGodownHead.setRole(EnumRole.godownhead);
        newGodownHead.setEmail(email);
        newGodownHead.setGodownId(GodownId);
        return godownHeadRepository.save(newGodownHead);
    }

    public GodownHead registerAdmin( String username, String password, String godownHeadName, String email, String godownheadNo) {
        if (isUsernameTaken(username)) {
            throw new IllegalArgumentException("Username already taken");
        }

        GodownHead newGodownHead = new GodownHead();
        newGodownHead.setUsername(username);
        newGodownHead.setPassword(password);
        newGodownHead.setGodownHeadName(godownHeadName);
        newGodownHead.setGodownheadNo(godownheadNo);
        newGodownHead.setRole(EnumRole.admin);
        newGodownHead.setEmail(email);
//        newGodownHead.setGodownId(godownId);
        return godownHeadRepository.save(newGodownHead);
    }

    public EnumRole getRoleByUsername(String username) {
        return godownHeadRepository.findRoleByUsername(username);
    }

    //    public Email getEmailByUsername(String email) {
//        return godownHeadRepository.findEmailByUsername(email);
//    }
    public GodownHead getByContactNumber(String godownheadNo){
        return godownHeadRepository.findByContactNumber(godownheadNo);
    }
    public GodownHead getGodownHeadDetailsByGodownId(int godownId) {
        return godownHeadRepository.findByGodownId(godownId);
    }
}
