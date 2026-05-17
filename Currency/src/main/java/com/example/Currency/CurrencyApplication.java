package com.example.Currency;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CurrencyApplication {

	public static void main(String[] args) {
		// Optional: set proxy if your network requires it
		// System.setProperty("https.proxyHost", "127.0.0.1");
		// System.setProperty("https.proxyPort", "8080");

		SpringApplication.run(CurrencyApplication.class, args);
	}

}
