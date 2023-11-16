import "../public/main.css";

/*                            DOM VARIABLES                                */
//TITLE
const nameTitle: HTMLHeadElement = document.querySelector(".name_title")!;
const countRepo: HTMLParagraphElement = document.querySelector(".count_repo")!;
const inputUser: HTMLInputElement = document.querySelector(".input_user")!;
const form: HTMLFormElement = document.forms[0];
//USER
const container: HTMLDivElement = document.querySelector(".container")!;
const img: HTMLImageElement = document.querySelector(".user_img")!;
const profileImg: HTMLImageElement = document.querySelector(".profile_img")!;
const nameUser: HTMLTitleElement = document.querySelector(".user_name")!;
const userName: HTMLTitleElement = document.querySelector(".username")!;
const userBio: HTMLTitleElement = document.querySelector(".bio")!;
const followers: HTMLParagraphElement = document.querySelector(".followers")!;
const following: HTMLParagraphElement = document.querySelector(".following")!;
const notFound: HTMLDivElement = document.querySelector(".not_found")!;
const btn: HTMLButtonElement = document.querySelector(".btn")!;
const notUser: HTMLParagraphElement = document.querySelector(".error")!;
const reposList: HTMLDivElement = document.querySelector(".repos")!;

//HANDLER FUNCTION

function handlerSubmit() {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const inputValue = inputUser.value; // User inputni olamiz va bo'sh probellarni olib tashlaymiz
		if (inputValue) {
			countRepo.style.display = "grid";
			profileImg.style.display = "block";
			getUser(inputValue);
			getRepos(inputValue);
		} else {
			console.error("User input is empty"); // Agar input bo'sh bo'lsa, console ga xabar chiqaramiz
		}
	});
}

function handlerClick() {
	btn.addEventListener("click", () => {
		notFound.style.display = "none";
		container.style.display = "block";
	});
}

//LOGICAL FUNCTIONS

function getUser(username: string) {
	fetch(`https://api.github.com/users/${username}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`GitHub API topa olmadi`);
			}
			return res.json();
		})
		.then((user) => {
			console.log("user = ", user);
			img.src = `${user.avatar_url}`;
			profileImg.src = `${user.avatar_url}`;
			nameUser.innerText = user.name;
			nameTitle.innerText = user.name;
			userName.innerText = `@${user.login}`;
			userBio.innerText = user.bio;
			countRepo.innerText = user.public_repos;
			followers.innerText = `👥 ${user.followers} followers`;
			following.innerText = ` ✅${user.following} following`;
			reposList.innerHTML = "";
		})
		.catch(() => {
			notFound.style.display = "flex";
			container.style.display = "none";
			notUser.innerText = `not found this ${inputUser.value} user`;
		});
}

function getRepos(username: string) {
	fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`GitHub API error`);
			}
			return res.json();
		})
		.then((repos) => {
			console.log("repos = ", repos);

			for (let i = 0; i < repos.length; i++) {
				console.log(repos[i].name);
				const repoChild = document.createElement("a");
				repoChild.href = repos[i].html_url;
				repoChild.className = `repoChild`;
				repoChild.innerText = repos[i].name;
				reposList.appendChild(repoChild);
			}
		})
		.catch((error) => {
			console.error("Error fetching user repositories:", error.message);
		});
}

function init() {
	handlerSubmit();
	handlerClick();
}

init();
