package com.upc.oss.minierp.dto.error;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class ErrorResponse {

    private int status;
    private String error;
    private String message;
    private List<FieldErrorResponse> errors;
    private String timestamp;

    public ErrorResponse(int status, String error, String message, List<FieldErrorResponse> errors) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.errors = errors;
        this.timestamp = LocalDateTime.now().toString();
    }
}
