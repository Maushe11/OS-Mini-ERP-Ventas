package com.upc.oss.minierp.exception;

import com.upc.oss.minierp.dto.error.ErrorResponse;
import com.upc.oss.minierp.dto.error.FieldErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 400 – Error de validación (DTO con @Valid)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationErrors(MethodArgumentNotValidException ex) {

        List<FieldErrorResponse> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> new FieldErrorResponse(err.getField(), err.getDefaultMessage()))
                .toList();

        ErrorResponse response = new ErrorResponse(
                400,
                "Bad Request",
                "Error de validación en uno o más campos.",
                errors
        );

        return ResponseEntity.badRequest().body(response);
    }

    /**
     * 401 – Credenciales incorrectas (BadCredentialsException)
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {

        ErrorResponse response = new ErrorResponse(
                HttpStatus.UNAUTHORIZED.value(),
                HttpStatus.UNAUTHORIZED.getReasonPhrase(),
                "Credenciales incorrectas. Verifica tu usuario o contraseña.",
                Collections.emptyList(),
                LocalDateTime.now().toString()
        );

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    /**
     * 403 – Acceso denegado (rol insuficiente)
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleForbidden(AccessDeniedException ex) {

        ErrorResponse response = new ErrorResponse(
                HttpStatus.FORBIDDEN.value(),
                HttpStatus.FORBIDDEN.getReasonPhrase(),
                "No tienes permisos para realizar esta acción.",
                Collections.emptyList(),
                LocalDateTime.now().toString()
        );

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    /**
     * 500 – Errores no controlados
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {

        ErrorResponse response = new ErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                "Ha ocurrido un error interno en el servidor.",
                Collections.emptyList(),
                LocalDateTime.now().toString()
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
