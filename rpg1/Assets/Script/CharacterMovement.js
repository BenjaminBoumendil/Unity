#pragma strict

//Public var
var speed: float;
var speedRun: float;
var speedRotate: float;
var jumpSpeed: float;
var particle: GameObject;
var anim: Animation;
var isHitting: boolean;

//Private var
private var controller: CharacterController;
private var moveDirection: Vector3;
private var runAnim: boolean;

function Start () {
	controller = GetComponent("CharacterController");
}

function Update () {
	//On ne cours pas
	runAnim = false;

	if (controller.isGrounded){
		//Deplacements Haut/Bas
		if (Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.RightShift)){
			moveDirection = Vector3(0, 0, Input.GetAxis("Vertical") * speedRun);	
			runAnim = true;
		}else{
			moveDirection = Vector3(0, 0, Input.GetAxis("Vertical") * speed);
		}

		//Coup de poing
		if (Input.GetKey(KeyCode.Q)){
			isHitting = true;
			anim.CrossFade("punch", 0.2);
		}

		//Attendre la fin de l'animation puch
		if (!anim["punch"].enabled){
			isHitting = false;
		}

		//Gestion de l'animation
		if (Input.GetKey(KeyCode.UpArrow) || Input.GetKey(KeyCode.DownArrow)){
			if (!runAnim){
				anim.CrossFade("walk", 0.2);
			}else{
				anim.CrossFade("run", 0.2);
			}
		}else if (!isHitting){
			anim.CrossFade("idle", 0.2);
		}

		if (Input.GetKey(KeyCode.Space)){
			moveDirection.y = jumpSpeed;
			anim.CrossFade("jump", 0.2);
		}
	}

	//Changer sur l'axe local
	moveDirection = transform.TransformDirection(moveDirection);	

	//Rotation du personnage
	transform.Rotate(Vector3(0, Input.GetAxis("Horizontal") * speedRotate * Global.deltaTime, 0));

	//Gravity
	moveDirection.y -= Global.gravity * Global.deltaTime;

	//Deplacement du Character Controller
	controller.Move(moveDirection * Global.deltaTime);
}

function OnTriggerEnter(hit:Collider){
	if (hit.transform.tag == "dagger"){
		Global.healthMain--;
		var tmp = Instantiate(particle, transform.Find("PartTarget").position, transform.Find("PartTarget").rotation);
		Destroy(tmp, 3);
	}
}