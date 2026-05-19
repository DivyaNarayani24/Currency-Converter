package com.example.Currency.model;


public class Currency {
    private String base;
    private String target;
    private double amount;

    public String getBase() { return base; }
    public void setBase(String base) { this.base = base; }

    public String getTarget() { return target; }
    public void setTarget(String target) { this.target = target; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}