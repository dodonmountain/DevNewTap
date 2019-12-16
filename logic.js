let yang = document.getElementById('yang94lol')


const clock = new Vue({
	el: '#app',
	data: {
		hours: 0,
		seconds: 0,
		date: moment().locale('ko').format('L') + moment().locale('ko').format('dddd')[0],
		countdown: 10,	
	},
	mounted: function() {
		setInterval(()=>{
			this.hours = [moment().format('LTS').split(':')][0]
			this.seconds = [moment().format('LTS').split(':')][0][2].split(' ')
		},500)
	}
})


const commitView = new Vue({
	el: '#commitView',
	data: {
		branches: ['master', 'dev'],
		currentBranch: 'master',
		commits: null,
		gitUserName: 'vuejs',
		repoName: 'vue',
	},
	mounted: function() {
		if (localStorage.gitUserName) {
			this.gitUserName = localStorage.gitUserName;
		}
		if (localStorage.repoName) {
			this.repoName = localStorage.repoName;
		}
	},
	watch: {
		gitUserName(newName) {
			localStorage.gitUserName = newName;
		},
		repoName(newName) {
			localStorage.repoName = newName;
		}
	},
	methods: {
		commitTrackerVisible() {
			const ctCont = document.getElementById('commitTrackerToggle')
			if (ctCont.hidden){
				ctCont.hidden = false
			} else {
				ctCont.hidden = true
			}
		},
		fetchData: function () {
			const xhr = new XMLHttpRequest()
			let apiURL = `https://api.github.com/repos/` + this.gitUserName + '/' + this.repoName + `/commits?per_page=3&sha=`
			xhr.open('GET', apiURL + this.currentBranch)
			xhr.onload = function () {
				this.commits = JSON.parse(xhr.responseText)
				const commitdiv = document.getElementById('commits')
				commitdiv.innerHTML=
				`<div>
				<p class="dropdown-item">` + `
				<a href="` + this.commits[0].html_url + `" target="_blank">` + this.commits[0].sha.slice(0, 7)+`</a>
				- <span class="message">` + this.commits[0].commit.message + `</span>
				by <span><a href="` + this.commits[0].author.html_url + `" target="_blank">` + this.commits[0].commit.author.name + `</a></span>
				at <span>` + this.commits[0].commit.author.date.replace(/T|Z/g, ' ') + `</span>
				</p>
				<p class="dropdown-item">` + `
				<a href="` + this.commits[1].html_url + `" target="_blank">` + this.commits[1].sha.slice(0, 7)+`</a>
				- <span class="message">` + this.commits[1].commit.message + `</span>
				by <span><a href="` + this.commits[1].author.html_url + `" target="_blank">` + this.commits[1].commit.author.name + `</a></span>
				at <span>` + this.commits[1].commit.author.date.replace(/T|Z/g, ' ') + `</span>
				</p>
				<p class="dropdown-item">` + `
				<a href="` + this.commits[2].html_url + `" target="_blank">` + this.commits[2].sha.slice(0, 7)+`</a>
				- <span class="message">` + this.commits[2].commit.message + `</span>
				by <span><a href="` + this.commits[2].author.html_url + `" target="_blank">` + this.commits[2].commit.author.name + `</a></span>
				at <span>` + this.commits[2].commit.author.date.replace(/T|Z/g, ' ') + `</span>
				</p>
				</div>`
			}
			xhr.send()
		}
	}
})

