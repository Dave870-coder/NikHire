// Mock Database using localStorage
class MockDatabase {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([]));
        }
        if (!localStorage.getItem('jobs')) {
            localStorage.setItem('jobs', JSON.stringify([]));
        }
        if (!localStorage.getItem('applications')) {
            localStorage.setItem('applications', JSON.stringify([]));
        }
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify([]));
        }
        if (!localStorage.getItem('institutions')) {
            localStorage.setItem('institutions', JSON.stringify([
                "Ahmadu Bello University",
                "Babcock University",
                "Bayero University",
                "Covenant University",
                "Federal University of Technology, Akure",
                "Lagos State University",
                "Nigerian Defence Academy",
                "Nnamdi Azikiwe University",
                "Obafemi Awolowo University",
                "University of Abuja",
                "University of Benin",
                "University of Calabar",
                "University of Ibadan",
                "University of Ilorin",
                "University of Jos",
                "University of Lagos",
                "University of Maiduguri",
                "University of Nigeria",
                "University of Port Harcourt",
                "University of Uyo",
                "Afe Babalola University",
                "American University of Nigeria",
                "Bells University of Technology",
                "Benson Idahosa University",
                "Bowen University",
                "Caleb University",
                "Caritas University",
                "Chrisland University",
                "Crescent University",
                "Elizade University",
                "Evan Enwerem University",
                "Fountain University",
                "Godfrey Okoye University",
                "Gregory University",
                "Igbinedion University",
                "Joseph Ayo Babalola University",
                "Kwararafa University",
                "Landmark University",
                "Lead City University",
                "Madonna University",
                "McPherson University",
                "Micheal Okpara University of Agriculture",
                "Mountain Top University",
                "Nile University of Nigeria",
                "Novena University",
                "Oduduwa University",
                "Pan-Atlantic University",
                "Redeemer's University",
                "Renaissance University",
                "Rhema University",
                "Ritman University",
                "Salem University",
                "Samuel Adegboyega University",
                "Southwestern University",
                "Tansian University",
                "Veritas University",
                "Wellspring University",
                "Wesley University",
                "Western Delta University",
                "Achievers University",
                "Ajayi Crowther University",
                "Al-Hikmah University",
                "Al-Qalam University",
                "Augustine University",
                "Baze University",
                "Bingham University",
                "Crawford University",
                "Dominion University",
                "Edwin Clark University",
                "Federal University, Dutse",
                "Federal University, Dutsin-Ma",
                "Federal University, Kashere",
                "Federal University, Lafia",
                "Federal University, Lokoja",
                "Federal University, Oye-Ekiti",
                "Federal University, Wukari"
            ]));
        }
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('users'));
    }

    getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    }

    addUser(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return user;
    }

    getJobs() {
        return JSON.parse(localStorage.getItem('jobs'));
    }

    addJob(job) {
        const jobs = this.getJobs();
        jobs.push(job);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        return job;
    }

    getApplications() {
        return JSON.parse(localStorage.getItem('applications'));
    }

    addApplication(application) {
        const applications = this.getApplications();
        applications.push(application);
        localStorage.setItem('applications', JSON.stringify(applications));
        return application;
    }

    getTasks() {
        return JSON.parse(localStorage.getItem('tasks'));
    }

    addTask(task) {
        const tasks = this.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return task;
    }

    getInstitutions() {
        return JSON.parse(localStorage.getItem('institutions'));
    }

    addInstitution(institution) {
        const institutions = this.getInstitutions();
        institutions.push(institution);
        localStorage.setItem('institutions', JSON.stringify(institutions));
        return institution;
    }
}

// API Class
class API {
    constructor() {
        this.db = new MockDatabase();
    }

    async registerUser(userData) {
        return new Promise((resolve, reject) => {
            if (!userData.email || !userData.password || !userData.name) {
                reject(new Error('Missing required fields'));
                return;
            }

            if (this.db.getUserByEmail(userData.email)) {
                reject(new Error('User already exists'));
                return;
            }

            const user = this.db.addUser(userData);
            resolve(user);
        });
    }

    async loginUser(email, password) {
        return new Promise((resolve, reject) => {
            const user = this.db.getUserByEmail(email);

            if (!user) {
                reject(new Error('User not found'));
                return;
            }

            if (user.password !== password) {
                reject(new Error('Incorrect password'));
                return;
            }

            resolve(user);
        });
    }

    async getJobs() {
        return new Promise((resolve) => {
            resolve(this.db.getJobs());
        });
    }

    async addJob(jobData) {
        return new Promise((resolve) => {
            const job = this.db.addJob(jobData);
            resolve(job);
        });
    }

    async applyForJob(applicationData) {
        return new Promise((resolve) => {
            const application = this.db.addApplication(applicationData);
            resolve(application);
        });
    }

    async getTasks() {
        return new Promise((resolve) => {
            resolve(this.db.getTasks());
        });
    }

    async addTask(taskData) {
        return new Promise((resolve) => {
            const task = this.db.addTask(taskData);
            resolve(task);
        });
    }

    async getInstitutions() {
        return new Promise((resolve) => {
            resolve(this.db.getInstitutions());
        });
    }

    async addInstitution(institution) {
        return new Promise((resolve) => {
            const newInstitution = this.db.addInstitution(institution);
            resolve(newInstitution);
        });
    }
}

// App State
class AppState {
    constructor() {
        this.api = new API();
        this.currentUser = null;
        this.init();
    }

    init() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            if (this.currentUser.role === 'admin') {
                this.renderAdminDashboard();
            } else {
                this.renderDashboard();
            }
        } else {
            this.renderHomePage();
        }
    }

    async registerUser(userData) {
        try {
            const user = await this.api.registerUser(userData);
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user.role === 'admin') {
                this.renderAdminDashboard();
            } else {
                this.renderDashboard();
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async loginUser(email, password) {
        try {
            const user = await this.api.loginUser(email, password);
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user.role === 'admin') {
                this.renderAdminDashboard();
            } else {
                this.renderDashboard();
            }
        } catch (error) {
            alert(error.message);
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.renderHomePage();
    }

    renderHomePage() {
        const content = `
            <div class="text-center py-16">
                <h1 class="text-4xl font-bold mb-4">Welcome to Nikhire</h1>
                <p class="text-xl text-gray-600 mb-8">Your campus recruitment solution</p>

                <div class="max-w-md mx-auto">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
                    </div>

                    <div class="mb-6">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password">
                    </div>

                    <div class="flex items-center justify-between">
                        <button id="loginSubmit" class="btn-primary px-4 py-2 rounded font-bold text-white focus:outline-none focus:shadow-outline">Login</button>
                        <button id="registerSubmit" class="btn-secondary px-4 py-2 rounded font-bold text-white focus:outline-none focus:shadow-outline">Register</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('appContent').innerHTML = content;

        document.getElementById('loginSubmit').addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            this.loginUser(email, password);
        });

        document.getElementById('registerSubmit').addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const name = prompt('Please enter your name:');
            if (name) {
                this.registerUser({ email, password, name, role: 'student' });
            }
        });
    }

    renderDashboard() {
        const content = `
            <div class="py-8">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold">Welcome, ${this.currentUser.name}</h1>
                    <button id="logoutBtn" class="btn-primary px-4 py-2 rounded">Logout</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 class="text-2xl font-bold mb-4">Available Jobs</h2>
                        <div id="jobList">
                            <!-- Jobs will be loaded here -->
                        </div>
                    </div>

                    <div>
                        <h2 class="text-2xl font-bold mb-4">Your Applications</h2>
                        <div id="applicationList">
                            <!-- Applications will be loaded here -->
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <h2 class="text-2xl font-bold mb-4">Your Tasks</h2>
                    <div id="taskList">
                        <!-- Tasks will be loaded here -->
                    </div>
                </div>

                <div class="mt-8">
                    <h2 class="text-2xl font-bold mb-4">Your Profile</h2>
                    <div id="profileSection">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="institution">Institution</label>
                            <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="institution">
                                <option value="">Select your institution</option>
                            </select>
                            <button id="addInstitutionBtn" class="btn-secondary px-4 py-2 rounded mt-2">Add New Institution</button>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="occupation">Occupation</label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="occupation" type="text" placeholder="Your desired occupation">
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="profileImage">Profile Image</label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="profileImage" type="file" accept="image/*">
                        </div>

                        <button id="saveProfileBtn" class="btn-primary px-4 py-2 rounded">Save Profile</button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('appContent').innerHTML = content;

        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        document.getElementById('addInstitutionBtn').addEventListener('click', () => {
            const newInstitution = prompt('Enter the name of your institution:');
            if (newInstitution) {
                this.api.addInstitution(newInstitution);
                this.loadInstitutions();
            }
        });

        document.getElementById('saveProfileBtn').addEventListener('click', () => {
            const institution = document.getElementById('institution').value;
            const occupation = document.getElementById('occupation').value;
            const profileImage = document.getElementById('profileImage').files[0];

            if (institution && occupation) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const user = this.currentUser;
                    user.institution = institution;
                    user.occupation = occupation;
                    user.profileImage = e.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('Profile updated successfully!');
                };
                if (profileImage) {
                    reader.readAsDataURL(profileImage);
                } else {
                    const user = this.currentUser;
                    user.institution = institution;
                    user.occupation = occupation;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('Profile updated successfully!');
                }
            } else {
                alert('Please fill in all fields');
            }
        });

        this.loadJobs();
        this.loadApplications();
        this.loadTasks();
        this.loadInstitutions();
    }

    renderAdminDashboard() {
        const content = `
            <div class="py-8">
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold">Admin Dashboard</h1>
                    <button id="logoutBtn" class="btn-primary px-4 py-2 rounded">Logout</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 class="text-2xl font-bold mb-4">All Users</h2>
                        <div id="userList">
                            <!-- Users will be loaded here -->
                        </div>
                    </div>

                    <div>
                        <h2 class="text-2xl font-bold mb-4">All Applications</h2>
                        <div id="allApplicationsList">
                            <!-- All applications will be loaded here -->
                        </div>
                    </div>
                </div>

                <div class="mt-8">
                    <h2 class="text-2xl font-bold mb-4">Add New Job</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="jobTitle">Job Title</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="jobTitle" type="text" placeholder="Job Title">
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="jobCompany">Company</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="jobCompany" type="text" placeholder="Company">
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="jobDescription">Description</label>
                        <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="jobDescription" placeholder="Job Description"></textarea>
                    </div>

                    <button id="addJobBtn" class="btn-secondary px-4 py-2 rounded">Add Job</button>
                </div>

                <div class="mt-8">
                    <h2 class="text-2xl font-bold mb-4">Assign Task to Student</h2>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="taskStudent">Student</label>
                        <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taskStudent">
                            <option value="">Select a student</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="taskDescription">Task Description</label>
                        <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taskDescription" placeholder="Task Description"></textarea>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="taskDueDate">Due Date</label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taskDueDate" type="date">
                    </div>

                    <button id="assignTaskBtn" class="btn-secondary px-4 py-2 rounded">Assign Task</button>
                </div>
            </div>
        `;

        document.getElementById('appContent').innerHTML = content;

        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        document.getElementById('addJobBtn').addEventListener('click', () => {
            const title = document.getElementById('jobTitle').value;
            const company = document.getElementById('jobCompany').value;
            const description = document.getElementById('jobDescription').value;

            if (title && company && description) {
                this.addJob({ title, company, description });
            } else {
                alert('Please fill in all fields');
            }
        });

        document.getElementById('assignTaskBtn').addEventListener('click', () => {
            const student = document.getElementById('taskStudent').value;
            const description = document.getElementById('taskDescription').value;
            const dueDate = document.getElementById('taskDueDate').value;

            if (student && description && dueDate) {
                this.assignTask({ student, description, dueDate });
            } else {
                alert('Please fill in all fields');
            }
        });

        this.loadUsers();
        this.loadAllApplications();
        this.loadStudentsForTasks();
    }

    async loadJobs() {
        const jobs = await this.api.getJobs();
        const jobList = document.getElementById('jobList');

        if (jobs.length === 0) {
            jobList.innerHTML = '<p class="text-gray-600">No jobs available at the moment.</p>';
            return;
        }

        jobList.innerHTML = jobs.map(job => `
            <div class="bg-white p-4 rounded shadow mb-4">
                <h3 class="text-xl font-bold mb-2">${job.title}</h3>
                <p class="text-gray-600 mb-2">${job.company}</p>
                <p class="text-gray-600 mb-4">${job.description}</p>
                <button class="btn-accent px-3 py-1 rounded text-sm apply-btn" data-job-id="${job.id}">Apply</button>
            </div>
        `).join('');

        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const jobId = e.target.getAttribute('data-job-id');
                this.applyForJob(jobId);
            });
        });
    }

    async loadApplications() {
        const applications = await this.api.getApplications();
        const userApplications = applications.filter(app => app.userId === this.currentUser.email);
        const applicationList = document.getElementById('applicationList');

        if (userApplications.length === 0) {
            applicationList.innerHTML = '<p class="text-gray-600">You haven\'t applied to any jobs yet.</p>';
            return;
        }

        applicationList.innerHTML = userApplications.map(app => `
            <div class="bg-white p-4 rounded shadow mb-4">
                <h3 class="text-xl font-bold mb-2">${app.jobTitle}</h3>
                <p class="text-gray-600 mb-2">${app.company}</p>
                <p class="text-gray-600 mb-2">Status: ${app.status}</p>
                <p class="text-gray-600 text-sm">Applied on: ${new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
        `).join('');
    }

    async loadTasks() {
        const tasks = await this.api.getTasks();
        const userTasks = tasks.filter(task => task.student === this.currentUser.email);
        const taskList = document.getElementById('taskList');

        if (userTasks.length === 0) {
            taskList.innerHTML = '<p class="text-gray-600">You don\'t have any tasks yet.</p>';
            return;
        }

        taskList.innerHTML = userTasks.map(task => `
            <div class="bg-white p-4 rounded shadow mb-4">
                <h3 class="text-xl font-bold mb-2">${task.description}</h3>
                <p class="text-gray-600 mb-2">Due: ${new Date(task.dueDate).toLocaleDateString()}</p>
                <p class="text-gray-600 mb-2">Status: ${task.status}</p>
                <p class="text-gray-600 text-sm">Assigned by: ${task.assignedBy}</p>
            </div>
        `).join('');
    }

    async loadInstitutions() {
        const institutions = await this.api.getInstitutions();
        const institutionSelect = document.getElementById('institution');

        institutionSelect.innerHTML = '<option value="">Select your institution</option>' +
            institutions.map(inst => `<option value="${inst}">${inst}</option>`).join('');
    }

    async loadUsers() {
        const users = this.api.db.getUsers();
        const userList = document.getElementById('userList');

        if (users.length === 0) {
            userList.innerHTML = '<p class="text-gray-600">No users registered yet.</p>';
            return;
        }

        userList.innerHTML = users.map(user => `
            <div class="bg-white p-4 rounded shadow mb-4">
                <h3 class="text-xl font-bold mb-2">${user.name}</h3>
                <p class="text-gray-600 mb-2">${user.email}</p>
                <p class="text-gray-600 mb-2">Role: ${user.role}</p>
                <p class="text-gray-600 mb-2">Institution: ${user.institution || 'Not set'}</p>
                <p class="text-gray-600 mb-2">Occupation: ${user.occupation || 'Not set'}</p>
            </div>
        `).join('');
    }

    async loadAllApplications() {
        const applications = await this.api.getApplications();
        const applicationList = document.getElementById('allApplicationsList');

        if (applications.length === 0) {
            applicationList.innerHTML = '<p class="text-gray-600">No applications submitted yet.</p>';
            return;
        }

        applicationList.innerHTML = applications.map(app => `
            <div class="bg-white p-4 rounded shadow mb-4">
                <h3 class="text-xl font-bold mb-2">${app.jobTitle}</h3>
                <p class="text-gray-600 mb-2">${app.company}</p>
                <p class="text-gray-600 mb-2">Applied by: ${app.userId}</p>
                <p class="text-gray-600 mb-2">Status: ${app.status}</p>
                <p class="text-gray-600 text-sm">Applied on: ${new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
        `).join('');
    }

    async loadStudentsForTasks() {
        const users = this.api.db.getUsers();
        const students = users.filter(user => user.role === 'student');
        const studentSelect = document.getElementById('taskStudent');

        studentSelect.innerHTML = '<option value="">Select a student</option>' +
            students.map(student => `<option value="${student.email}">${student.name}</option>`).join('');
    }

    async addJob(jobData) {
        const job = {
            id: Date.now().toString(),
            ...jobData
        };

        await this.api.addJob(job);
        alert('Job added successfully!');

        document.getElementById('jobTitle').value = '';
        document.getElementById('jobCompany').value = '';
        document.getElementById('jobDescription').value = '';
    }

    async assignTask(taskData) {
        const task = {
            id: Date.now().toString(),
            assignedBy: this.currentUser.email,
            status: 'Pending',
            ...taskData
        };

        await this.api.addTask(task);
        alert('Task assigned successfully!');

        document.getElementById('taskStudent').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('taskDueDate').value = '';
    }

    async applyForJob(jobId) {
        const jobs = await this.api.getJobs();
        const job = jobs.find(j => j.id === jobId);

        if (!job) {
            alert('Job not found');
            return;
        }

        const application = {
            id: Date.now().toString(),
            userId: this.currentUser.email,
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            status: 'Applied',
            appliedAt: new Date().toISOString()
        };

        await this.api.applyForJob(application);
        this.loadApplications();
        alert('Application submitted successfully!');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AppState();
});
