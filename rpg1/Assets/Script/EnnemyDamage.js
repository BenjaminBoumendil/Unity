function OnTriggerEnter(hit:Collider){
	if (hit.transform.tag == "ennemy"){
		hit.SendMessage("getHit", 1);
	}
}