package com.electrowaveselectronics.inventorymanagement.repository;

import com.electrowaveselectronics.inventorymanagement.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

//@Repository
public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder,Integer> {

    @Query("SELECT COUNT(p) FROM PurchaseOrder p WHERE p.godownId = :godownId")
    int countByGodownId(int godownId);

}
