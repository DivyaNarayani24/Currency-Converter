package com.example.Currency.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
 
@Service
public class CurrencyService {

    private static final String API_URL = "https://api.frankfurter.app/latest?amount=%s&from=%s&to=%s";

    @Autowired
    private RestTemplate restTemplate;

    public double forName(double amount, String fromCurrency, String toCurrency) {
        try {
            String url = String.format(API_URL, amount, fromCurrency, toCurrency);
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

            Map<String, Object> rates = (Map<String, Object>) response.getBody().get("rates");
            return Double.parseDouble(rates.get(toCurrency).toString());

        } catch (Exception e) {
            e.printStackTrace(); // see exact error
            return -1.0;
        }
    }
}
