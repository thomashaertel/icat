package example;

import java.math.BigDecimal;
import java.math.BigInteger;
/**
 * @model
 */ 
public interface ShipItem {
	/**
	 * @model lowerBound="1"
	 */ 
	public String getTitle();
	/**
	 * @model
	 */ 
	public String getNote();
	/**
	 * @model lowerBound="1"
	 */ 
	public BigInteger getQuantity();
	/**
	 * @model lowerBound="1"
	 */ 
	public BigDecimal getPrice();
}
