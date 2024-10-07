package com.electrowaveselectronics.inventorymanagement.repository;

import com.electrowaveselectronics.inventorymanagement.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    @Query("SELECT c FROM Customer c WHERE c.customerName = :customerName")
    Customer findByName(String customerName);

    @Query("SELECT c FROM Customer c WHERE c.customerNo = :customerNo")
    Customer findByContactNumber(String customerNo);

    @Query("SELECT c FROM Customer c WHERE c.customerAddress = :customerAddress")
    Customer findByAddress(String customerAddress);

    boolean existsByCustomerNo(String contactNumber);

    boolean existsByCustomerId(int id);

//    @Query("Select COUNT(g) from Godown g where ")
}
