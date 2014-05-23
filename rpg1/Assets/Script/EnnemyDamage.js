var hitSound: AudioClip;

function OnTriggerEnter(hit:Collider){
	if (hit.transform.tag == "ennemy"){
		//Lire le son
		audio.PlayOneShot(hitSound);
		hit.SendMessage("getHit", 1);
	}
}