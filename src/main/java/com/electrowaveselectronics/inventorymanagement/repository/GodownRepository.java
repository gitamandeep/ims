package com.electrowaveselectronics.inventorymanagement.repository;

import com.electrowaveselectronics.inventorymanagement.entity.Godown;
import com.electrowaveselectronics.inventorymanagement.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GodownRepository extends JpaRepository<Godown, Integer> {

    @Query("SELECT COUNT(g) > 0 FROM Godown g WHERE g.address = :address")
    boolean existsByAddress(@Param("address") String address);

    List<Godown> findByAddressLike(String partialAddress);

}
