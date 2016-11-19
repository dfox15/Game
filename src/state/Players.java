package state;

public class Players {
	
	public String name;
	private boolean isTurn;
	// Add cards data structure

	public enum ACTION {
		Move, Suggest, Disprove, Accuse
	}
	public enum Name {
	    Col_Mustard, Miss_Scarlet, Mrs_Green, Mrs_Peacock,
	    Mrs_White, Prof_Plum 
	};

	public Players(String name) {
		this.name = name;
	}
	
	public boolean isTurn() {
		return isTurn;
	}

	public void setTurn(boolean turn) {
		this.isTurn = turn;
	}

}
