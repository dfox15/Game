package state;

public class Location {

	private String currentLocation;
	private boolean validMove;
	public enum Room {
	    Ballroom, Hallway, Billiard, Conservatory, DiningRoom, Hall,
	    Kitchen, Library, Lounge, Study
	};
	
	public String getCurrentLocation() {
		return currentLocation;
	}
	
	public void setCurrentLocation(String currentLocation) {
		this.currentLocation = currentLocation;
	}
	
	public boolean getvalidMove() {
		return validMove;
	}
	
	public void setvalidMove(boolean validMove) {
		this.validMove = validMove;
	}
	
}
