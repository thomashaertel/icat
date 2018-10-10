package example;

import java.util.List;
/**
 * @model
 */ 
public interface ShipOrder {
	/**
	 * @model
	 */ 
	public String getOrderperson();
	/**
	 * @model
	 */ 
	public String getOrderid();
	/**
	 * @model
	 */ 
	public List<ShipItem> getItems();
	/**
	 * @model
	 */ 
	public ShipToType getShipto();
}
