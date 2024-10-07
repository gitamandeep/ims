
package com.electrowaveselectronics.inventorymanagement.service;
import com.electrowaveselectronics.inventorymanagement.dto.DeliveryOrderDTO;
import com.electrowaveselectronics.inventorymanagement.dto.ProductDTO;
import com.electrowaveselectronics.inventorymanagement.entity.*;
import com.electrowaveselectronics.inventorymanagement.repository.CustomerRepository;
import com.electrowaveselectronics.inventorymanagement.repository.DeliveryRepository;
import com.electrowaveselectronics.inventorymanagement.repository.GodownRepository;
import com.electrowaveselectronics.inventorymanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Service
public class DeliveryOrderService {

    @Autowired
    DeliveryRepository deliveryRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    ProductRepository productRepository;
    @Autowired
    GodownService godownService;

    @Autowired
    GodownRepository godownRepository;
    @Autowired
    GodownHeadService godownHeadService;

    public List<DeliveryOrder> getAllDeliveryOrders() throws Exception {
        try {
            List<DeliveryOrder> deliveryOrders = deliveryRepository.findAll();

            return deliveryOrders;
        } catch (Exception e) {
            throw e;
        }
    }

    public DeliveryOrder  getDeliveryOrderById(int id) throws Exception {

        try {
            Optional<DeliveryOrder> deliveryOrderById = deliveryRepository.findById(id);
            return deliveryOrderById.orElse(null);
        } catch (Exception e) {
            throw e;
        }
    }
    public List<DeliveryOrder> getDeliveryOrderByCustomerId(int customer_id){
        try {

            return deliveryRepository.findByCustomerCustomerId(customer_id);
        } catch (Exception e) {
            throw e;
        }

    }

    public List<DeliveryOrder> getDeliveryOrderByGodownId(int godown_id){
        try {

            return deliveryRepository.findByGodownId(godown_id);
        } catch (Exception e) {
            throw e;
        }

    }


    public DeliveryOrder setOrder(int customerId, DeliveryOrderDTO deliveryOrderDTO) {
        try {
            Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new NoSuchElementException("Customer not found for ID: " + customerId));
            DeliveryOrder deliveryOrder = new DeliveryOrder();
            deliveryOrder.setOrderDate(new Date());

            int deliveryDays = 7;
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.DAY_OF_MONTH, deliveryDays);
            deliveryOrder.setExpectedDate(calendar.getTime());

            int totalQuantity = 0;
            double totalSellprice = 0;

            for (int godownId = 1; godownId <= (int)godownService.getGodownCount(); godownId++) {
                List<ProductDTO> products = deliveryOrderDTO.getProducts();
                boolean orderPlaced = true;
                for (ProductDTO productDTO : products) {
                    // Validate order quantity
                    if (productDTO.getOrderQuantity() <= 0) {
                        throw new IllegalArgumentException("Order quantity must be a positive integer");
                    }
                    productDTO.addTaxAmount();
                    totalQuantity += productDTO.getOrderQuantity();
                    totalSellprice += productDTO.getSellPrice() * productDTO.getOrderQuantity();

                    deliveryOrder.addProduct(productDTO);

                    Product product = productRepository.findProductByGodownIdAndProductName(godownId, productDTO.getProductName());
                    int prodQuantityNeeded = productDTO.getOrderQuantity();
                    if (product == null || product.getTotalQuantity() < prodQuantityNeeded) {
                        orderPlaced = false;
                        break; // Break the inner loop and try next godown
                    }
                }

                if (orderPlaced) {
                    // Reduce product quantities and save delivery order
                    for (ProductDTO productDTO : deliveryOrderDTO.getProducts()) {
                        Product product = productRepository.findProductByGodownIdAndProductName(godownId, productDTO.getProductName());
                        int prodQuantityNeeded = productDTO.getOrderQuantity();
                        int prodQuantityAvailable = product.getTotalQuantity();
                        product.setTotalQuantity(prodQuantityAvailable - prodQuantityNeeded);
                        productRepository.save(product);
                    }
                    deliveryOrder.setTotalSellPrice((int) totalSellprice);
                    deliveryOrder.setOrderQuantity(totalQuantity);
                    deliveryOrder.setCustomer(customer);
                    deliveryOrder.setGodownId(godownId);
                    GodownHead godownHead = godownHeadService.getGodownHeadDetailsByGodownId(godownId);
                    deliveryOrder.setGodownHeadName(godownHead.getGodownHeadName());
                    deliveryOrder.setGodownAddress(godownRepository.findById(godownId).get().getAddress());
                    return deliveryRepository.save(deliveryOrder);
                }
            }
            return null; // Order could not be placed in any godown
        } catch (Exception e) {
            throw e;
        }
    }



//////////////////////////////////////////////








}
