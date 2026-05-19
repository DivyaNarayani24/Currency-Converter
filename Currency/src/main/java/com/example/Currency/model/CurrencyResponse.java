package com.example.Currency.model;


public class CurrencyResponse {

    private String from;
    private String to;
    private double requestedAmount;
    private double convertedAmount;
    private String date;   
    public String getFrom() { return from; }
    public void setFrom(String from) { this.from = from; }

    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }

    public double getRequestedAmount() { return requestedAmount; }
    public void setRequestedAmount(double requestedAmount) { this.requestedAmount = requestedAmount; }

    public double getConvertedAmount() { return convertedAmount; }
    public void setConvertedAmount(double convertedAmount) { this.convertedAmount = convertedAmount; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}