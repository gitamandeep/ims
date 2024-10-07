package com.electrowaveselectronics.inventorymanagement.repository;

import com.electrowaveselectronics.inventorymanagement.entity.GodownHead;
import com.electrowaveselectronics.inventorymanagement.util.EnumRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GodownHeadRepository extends JpaRepository<GodownHead, Integer> {
    GodownHead findByGodownHeadName(String godownHeadName);
    GodownHead findByUsername(String username);

    @Query("SELECT g.role FROM GodownHead g WHERE g.username = :username")
    EnumRole findRoleByUsername(@Param("username")String username);

    @Query("SELECT g FROM GodownHead g WHERE g.godownHeadName = :godownHeadName")
    GodownHead findByName(String godownHeadName);

    @Query("SELECT g FROM GodownHead g WHERE g.godownheadNo = :godownheadNo")
    GodownHead findByContactNumber(String godownheadNo);

    GodownHead findByGodownId(int godownId);

}
