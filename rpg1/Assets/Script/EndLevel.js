function OnTriggerEnter(hit:Collider){
	if (Global.currentObjective >= Global.objective){
		Application.LoadLevel("YouWin");
	}
}