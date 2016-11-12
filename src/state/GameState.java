package state;

public class GameState {
	
	private static GameState _instance;
	
	public GameState(){
		//handle new game state here
		
		
	}
	public static GameState getCurrentGame() {
		if(_instance == null){
			_instance = new GameState();
		}
		
		return _instance;
	}

}
