package com.example.Currency.controller;

import com.example.Currency.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrencyController {

    @Autowired
    private CurrencyService currencyService;

    @GetMapping("/convert")
    public double convert(@RequestParam double amount,
                          @RequestParam String from,
                          @RequestParam String to) {
        return currencyService.forName(amount, from, to);
    }
}
