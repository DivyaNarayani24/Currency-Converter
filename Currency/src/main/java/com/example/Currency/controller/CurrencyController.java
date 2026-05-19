package com.example.Currency.controller;

import com.example.Currency.model.CurrencyResponse;
import com.example.Currency.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    @GetMapping("/convert")
    public ResponseEntity<?> convert(
            @RequestParam double amount,
            @RequestParam String base,
            @RequestParam String target) {

        CurrencyResponse result = currencyService.convert(amount, base, target);

        if (result == null) {
            return ResponseEntity
                    .status(503)
                    .body("Conversion failed. Frankfurter API unavailable.");
        }

        return ResponseEntity.ok(result);
    }
}