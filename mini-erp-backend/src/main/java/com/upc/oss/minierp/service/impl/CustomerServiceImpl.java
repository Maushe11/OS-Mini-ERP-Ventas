package com.upc.oss.minierp.service.impl;

import com.upc.oss.minierp.dto.request.CustomerRequestDto;
import com.upc.oss.minierp.dto.response.CustomerResponseDto;
import com.upc.oss.minierp.entity.CustomerEntity;
import com.upc.oss.minierp.mapper.CustomerMapper;
import com.upc.oss.minierp.repository.CustomerRepository;
import com.upc.oss.minierp.repository.SalesOrderRepository;
import com.upc.oss.minierp.service.ICustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements ICustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
    private final SalesOrderRepository salesOrderRepository;

    @Override
    public List<CustomerResponseDto> listAll() {
        return customerMapper.toDtoList(customerRepository.findAll());
    }

    @Override
    public CustomerResponseDto findById(Long id) {
        CustomerEntity customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        return customerMapper.toDto(customer);
    }

    @Override
    public CustomerResponseDto create(CustomerRequestDto dto) {

        if (customerRepository.existsByDocument(dto.getDocument())) {
            throw new RuntimeException("El documento ya se encuentra registrado");
        }

        CustomerEntity customerEntity = customerMapper.toEntity(dto);
        customerRepository.save(customerEntity);

        return customerMapper.toDto(customerEntity);
    }

    @Override
    public CustomerResponseDto update(Long id, CustomerRequestDto dto) {
        CustomerEntity customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        customerMapper.updateEntityFromDto(dto, customer);

        customerRepository.save(customer);
        return customerMapper.toDto(customer);
    }

    @Override
    public void delete(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Cliente no encontrado");
        }

        if (salesOrderRepository.countAllByCustomerId(id) > 0) {
            throw new RuntimeException("No se puede eliminar al cliente porque tiene órdenes de venta asociadas.");
        }

        customerRepository.deleteById(id);
    }

    @Override
    public Page<CustomerResponseDto> search(String filter, int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        Page<CustomerEntity> result =
                customerRepository.findByNameContainingIgnoreCaseOrDocumentContainingIgnoreCase(
                        filter, filter, pageable
                );

        return result.map(customerMapper::toDto);
    }
}
