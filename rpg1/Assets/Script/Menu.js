function OnGUI(){
	if (GUI.Button(Rect(Screen.width/2 - 100, Screen.height/2, 200, 50), "Start the game")){
		Application.LoadLevel("lvl1");
	}
}