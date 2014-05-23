#pragma strict

//Public var
var speed: int;
var anim: Animation;
var theScript: AI;

//Private var
private var controller: CharacterController;
private var moveDirection: Vector3;
private var delayRotation: float;
private var changeRotation: float;
private var newRotation: float;
private var hit: RaycastHit;
private var dirToMain: Vector3;
private var fight: boolean;
private var health: int;

function Start () {
	health = 5;
	delayRotation = Random.Range(1, 6);
	newRotation = Random.Range(-360, 361);
	controller = GetComponent("CharacterController");
	theScript = GetComponent(AI);
}

function Update () {
	//Golem damage
	if (health <= 0){
		anim.CrossFade("die", 0.5);
		Destroy(gameObject, 5);
		controller.enabled = false;
		theScript.enabled = false;
		Global.currentObjective++;
		return ;
	}

	//Direction vers personnage
	dirToMain = GameObject.Find("Golem").transform.position - transform.position;
	dirToMain.y = 0;
	if (!fight){
		if (dirToMain.magnitude < 6){
			//Suivre le vecteur dirToMain qui va de l'ennemi a Golem
			moveDirection = dirToMain * 0.5;
			transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(dirToMain), 10 * Global.deltaTime);
		}else{
			//Vecteur directeur
			moveDirection = Vector3.forward * speed;
	
			//Changement de rotation tout les tant...
			if (changeRotation + delayRotation < Global.fixedTime){
				newRotation = Random.Range(-360, 361);
				delayRotation = Random.Range(1, 6);
				changeRotation = Global.fixedTime;
			}

			//Test du raycast de "lui"
			if (Physics.Raycast(transform.Find("origin").position, transform.forward, hit)){
				if (hit.distance < 5){
					transform.rotation = Quaternion.Slerp(transform.rotation, transform.rotation * Quaternion.Euler(0, 180, 0), 0.5 * Global.deltaTime);
				}else{
					transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.Euler(0, newRotation, 0), 0.5 * Global.deltaTime);
				}
			}
			//Transformation locale
			moveDirection = transform.TransformDirection(moveDirection);
		}
	}

	//FIGHT !
	if (dirToMain.magnitude < 1){
		fight = true;

		//On stop le personnage
		moveDirection = Vector3.zero; //Vector3(0, 0, 0)

		//direction de la vue
		transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(dirToMain), 10 * Global.deltaTime);
	}else{
		fight = false;
	}

	//Affichage du raycast de debug
	Debug.DrawRay(transform.Find("origin").position, transform.forward, Color.red, 1);

	//Animations
	if (fight){
		anim.CrossFade("attack", 0.5);
	}else{
		anim.CrossFade("run", 0.5);
	}

	//Deplacement ennemy
	moveDirection.y -= Global.gravity;
	controller.Move(moveDirection * Global.deltaTime);
}

//Collision objet
function OnControllerColliderHit(hit:ControllerColliderHit){
	if (hit.transform.name != "Terrain"){
		transform.rotation = Quaternion.Slerp(transform.rotation, transform.rotation * Quaternion.Euler(0, 180, 0), 0.5 * Global.deltaTime);
	}
}

//Golem damage
function getHit(nb:int){
	health -= nb;
	// guiText.text = Global.dmgToEnnemy;
}