package com.electrowaveselectronics.inventorymanagement.controller;

import com.electrowaveselectronics.inventorymanagement.entity.Customer;
import com.electrowaveselectronics.inventorymanagement.repository.CustomerRepository;
import com.electrowaveselectronics.inventorymanagement.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
@CrossOrigin(origins = "http://127.0.0.1:5500", allowCredentials = "true")
@RestController
// Adjusted base pathz
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    CustomerService customerService;


    @GetMapping("/getAllCustomers")
    @ResponseBody
    public ResponseEntity<?> getAllCustomers() {

        try {
            List<Customer> customers = customerService.getAllCustomers();
            if (!customers.isEmpty()) {
                return new ResponseEntity<>(customers, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>("Customer list is empty", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/createCustomer")
    public ResponseEntity<?> createCustomer(@RequestBody Customer customer) {

        // Check if the contact number already exists
        if (customerService.isContactNumberExists(customer.getCustomerNo())) {
            return new ResponseEntity<>("Contact number already exists. Please use a different one.", HttpStatus.BAD_REQUEST);
        }


        try {
            Customer newCustomer = customerService.createCustomer(customer);
            if (!Objects.isNull(newCustomer)) {
                return new ResponseEntity<>("New Customer has been created.", HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>("Something went wrong while creating the customer", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Something went wrong while creating the customer", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getCustomerById/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable int id) {

        try {
            Customer customer = customerService.getCustomerById(id);
            if (customer != null) {
                return new ResponseEntity<>(customer, HttpStatus.ACCEPTED);
            } else {
                return new ResponseEntity<>("Customer not found with ID: " + id, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Customer not found with ID: ", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/setCustomer")
    public String setCustomer(@RequestBody Customer NewDataCustomer) throws Exception {
        try {
            return customerService.setCustomer(NewDataCustomer);

        } catch (Exception e) {
            return e.toString();
        }
    }

    @PutMapping("/updateCustomerById/{customerId}")
    public ResponseEntity<?> updateCustomerById(@PathVariable int customerId, @RequestBody Customer NewDataCustomer) throws Exception {
        if (customerService.isContactNumberExists(NewDataCustomer.getCustomerNo())) {
            return new ResponseEntity<>("Contact number already exists. Please use a different one.", HttpStatus.BAD_REQUEST);
        } else {
            Customer newCustomer = customerService.updateCustomer(customerId,NewDataCustomer);
            return new ResponseEntity<>("Customer updated with customer id: " + customerId,HttpStatus.ACCEPTED);
        }
    }


}
