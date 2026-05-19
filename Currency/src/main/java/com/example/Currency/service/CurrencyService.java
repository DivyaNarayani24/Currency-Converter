package com.example.Currency.service;

import com.example.Currency.model.CurrencyResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@Service
public class CurrencyService {

    // Frankfurter API endpoint
    private static final String API_URL =
            "https://api.frankfurter.app/latest?amount=%s&from=%s&to=%s";

    @Autowired
    private RestTemplate restTemplate;

    /**
     * Converts amount from one currency to another using Frankfurter API.
     * Returns null if conversion fails (caller should return HTTP 503).
     */
    public CurrencyResponse convert(double amount, String fromCurrency, String toCurrency) {
        try {
            String url = String.format(API_URL, amount, fromCurrency, toCurrency);
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

            Map<String, Object> body = response.getBody();
            if (body == null) return null;

            // Extract converted amount from "rates" map
            Map<String, Object> rates = (Map<String, Object>) body.get("rates");
            if (rates == null || !rates.containsKey(toCurrency)) return null;

            double convertedAmount = Double.parseDouble(rates.get(toCurrency).toString());
            String date = (String) body.get("date");

            // Build and return response object
            CurrencyResponse result = new CurrencyResponse();
            result.setConvertedAmount(convertedAmount);
            result.setDate(date);
            result.setFrom(fromCurrency);
            result.setTo(toCurrency);
            result.setRequestedAmount(amount);

            return result;

        } catch (Exception e) {
            System.err.println("[CurrencyService] Error calling Frankfurter API: " + e.getMessage());
            return null;
        }
    }
}