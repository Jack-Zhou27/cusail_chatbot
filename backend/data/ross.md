---
layout: post
author: Nikil Shyamsunder 
categories: ['ROS']
logo: ros-logo.jpg
title: Setting Up ROS 
---

<link rel="stylesheet" href="{{site.baseurl}}/css/code_styles/hybrid.css">
<script src="{{site.baseurl}}/js/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>

# Dockerized ROS2 Sailbot Setup

This tutorial will guide you through cloning a ROS2 project repository via SSH, building a Docker image, and running it in a Docker container. By the end, you’ll have a fully functional Docker environment for your ROS2 project.

---

## Prerequisites

Before starting, ensure you have **Docker** installed on your machine. You can download Docker Desktop [here](https://www.docker.com/products/docker-desktop). Additionally, make sure **SSH keys** are set up and added to your GitHub account. If not, follow [GitHub's guide on SSH key setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).

---

## Step 1: Clone the Repository via SSH

First, open your terminal and navigate to the directory where you want to clone the repository:

<pre>
<code class="bash">
cd ~/path/to/your/workspace
</code>
</pre>

Next, clone the repository using SSH. Replace the SSH URL with the correct URL for your repository:

<pre>
<code class="bash">
git clone git@github.com:CUSail-Navigation/sailbot.git
</code>
</pre>

This creates a directory with the project files. Navigate to this directory:

<pre>
<code class="bash">
cd sailbot
</code>
</pre>

Before building the Docker image, let’s go over the project structure. Your project has two main directories, `setup/` and `src/`.

The `setup/` folder contains the `Dockerfile`, `requirements.txt`, and `setup_ros.sh` script to configure your ROS2 environment in Docker. The `src/` folder holds all your ROS2 packages and code.

Here’s the file structure of the project:

<pre>
<code class="bash">
/project-root
│
├── /setup
│   ├── Dockerfile
│   ├── requirements.txt
│   └── setup_ros.sh
│
└── /src
    └── (ROS2 packages)
</code>
</pre>

### Explanation of Files:

- **`/setup/Dockerfile`**: Defines the Docker image for a containerized ROS2 environment, setting up the base image, installing dependencies, and configuring a non-root user.
- **`/setup/requirements.txt`**: Lists Python dependencies (if any) that are installed inside the Docker container using `pip`.
- **`/setup/setup_ros.sh`**: A shell script that automates setup for your ROS2 workspace, builds ROS2 packages, and sources the workspace.
- **`/src/`**: This directory holds ROS2 packages, including nodes, launch files, and any other code for the ROS2 application.

---

## Step 1.5 Ensure Unix Style Endings for `setup_ros.sh`

To avoid issues with line endings that may prevent `setup_ros.sh` from running properly in the Docker container, execute the following command to convert the file to Unix-style line endings if you're on a *Unix-based* system:

<pre>
<code class="bash">
sed -i 's/\r$//' setup/setup_ros.sh
</code>
</pre>

**If you're on Windows:** open the file in VSCode. At the bottom right of your window, directly left of where it says "Shell Script," you should see "CRLF" or "LF." If it says CRLF, click on it, switch to LF, and save the file.

## Step 2: Build the Docker Image

To build the Docker image, run this command from the `setup` folder:

<pre>
<code class="bash">
cd setup
docker build -t ros2_humble_custom .
</code>
</pre>

The `-t ros2_humble_custom` flag tags the image, and the `.` tells Docker to use the current directory as the build context.

Docker will use the `Dockerfile` to create the image. This step may take a few minutes as Docker installs dependencies and sets up the environment. If you encounter an error such as `ERROR: Cannot connect to the Docker daemon`, make sure the Docker application is running and try the command again.

---

## Step 3: Run the Docker Container

Once the image is built, you can run the Docker container.

### Run the Container with Volume Mounting

Run the following command from the project root to mount your `src/` directory to the container and make it accessible within the container:

<pre>
<code class="bash">
cd ..
docker run -it --rm --name ros2_container \
  -v $(pwd)/src:/home/ros2_user/ros2_ws/src \
  ros2_humble_custom
</code>
</pre>

**Note for Windows Users!** The equivalent Powershell command is:

<pre>
<code class="bash">
docker run -it --rm --name ros2_container -v ${PWD}/src:/home/ros2_user/ros2_ws/src ros2_humble_custom
</code>
</pre>

Note that the use of `\` to delimit newlines in a multi-line unix command does not work in Windows (you can jsut run the command as one line). Additionally, from now on any command we give for unix which has `$(pwd)` should be `${PWD}` in Powershell. **From this point onwards, we will simply write the Unix commands.**

Explanation of the options:

- `-it` runs the container interactively, allowing you to enter commands.
- `--rm` automatically removes the container when it exits.
- `--name ros2_container` names the container.
- `-v $(pwd)/src:/home/ros2_user/ros2_ws/src` mounts the `src/` directory from your host machine into the container at `/home/ros2_user/ros2_ws/src`.
- `ros2_humble_custom` specifies the Docker image you built.
  
### Run a ROS Node

To verify everything is working, you can run a ROS node from your workspace:

<pre>
<code class="bash">
ros2 launch sailboat_launch sailboat.launch_sim.py
</code>
</pre>

This command should run without failure and print out a bunch of logs from different ROS nodes we spawn. Here is a sample: 

<pre>
<code class="bash">
[INFO] [launch]: All log files can be found below /root/.ros/log/2024-11-12-23-29-02-429433-dcc01d75122c-675
[INFO] [launch]: Default logging verbosity is set to INFO
[INFO] [airmar-1]: process started with pid [676]
[INFO] [anemometer-2]: process started with pid [678]
[INFO] [servo-3]: process started with pid [680]
[INFO] [main_algo-4]: process started with pid [682]
[INFO] [trim_sail-5]: process started with pid [684]
[INFO] [waypoint_service-6]: process started with pid [686]
[INFO] [radio-7]: process started with pid [688]
[INFO] [mux-8]: process started with pid [690]
[INFO] [rosbridge_websocket-9]: process started with pid [692]
[anemometer-2] [INFO] [1731454142.658098509] [sailbot.anemometer]: Launching Anemometer
[radio-7] [INFO] [1731454142.658280967] [sailbot.radio]: Starting up radio module in simulated mode
[servo-3] [INFO] [1731454142.658497176] [sailbot.servo]: Simulation mode enabled. Serial communication is disabled.
[waypoint_service-6] [INFO] [1731454142.692090051] [sailbot.waypoint_service]: Waypoints: ['42.876400267,-77.00778818759738', '42.876373,-77.007596', '42.876278,-77.007588']
[waypoint_service-6] [INFO] [1731454142.692293176] [sailbot.waypoint_service]: Navigate service started
[main_algo-4] [INFO] [1731454142.714977759] [sailbot.main_algo]: Main-algo started successfully
[...]
</code>
</pre>

---

## Step 4: Stopping the Container

To exit the container, press `Ctrl+D` or type `exit`. If you used the `--rm` flag, the container will automatically be removed after you exit. To keep the container running in the background, remove the `--rm` flag and use the `-d` flag for detached mode:

<pre>
<code class="bash">
docker run -d --name ros2_container \
  -v $(pwd)/src:/home/ros2_user/ros2_ws/src \
  ros2_humble_custom
</code>
</pre>

---

## Step 5: Understanding our Software Development Lifecycle (SDLC) Process

This setup follows a typical Software Development Lifecycle (SDLC) where you write and test code iteratively.

To develop code, work within the `sailbot/src` directory. This directory contains all ROS2 packages, nodes, launch files, and configurations. You can use any IDE or text editor, such as VS Code or PyCharm, to edit and manage code in this directory.

For testing, changes in `sailbot/src` are automatically available in the container because Docker mounts the directory. Start testing by running the Docker image with this command:

<pre>
<code class="bash">
docker run -it --rm -p 8000:7000 -p 9090:9090 --name ros2_container \
-v $(pwd)/src:/home/ros2_user/ros2_ws/src \
ros2_humble_custom
</code>
</pre>

This command launches the Docker container, mounts the `src` directory, and builds the workspace inside the container. From there, you can run any ROS2 nodes to test your code.

Any changes made in `sailbot/src` are reflected automatically in the container. However, you may need to rebuild your ROS2 workspace inside the container. To do this, run:

<pre>
<code class="bash">
colcon build
</code>
</pre>

After building, source the setup file again to ensure changes are ready for testing:

<pre>
<code class="bash">
source install/setup.bash
</code>
</pre>

If you need to open a second terminal within the same container for concurrent processes, use this command:

<pre>
<code class="bash">
docker exec -it ros2_container
</code>
</pre>
---

This setup provides a consistent environment where dependencies and tools are isolated within the container, allowing you to develop and test your ROS2 project smoothly.