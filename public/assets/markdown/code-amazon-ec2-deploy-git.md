Here's a quick setup on how to deploy a swift application to an EC2 instance.

**note :** I'm building and deploying a swift application here, but you'll see that you can apply the same recipe for any other stack easily.

![cover](/assets/images/rocket-launch.jpg =100%x*)

Setup your EC2 instance
=======================

First of all you will need an EC2 instance running Ubuntu 14.04

![launch instance](/assets/images/ec2-launch-instance.png =100%x*)

**note :** when setting up your instance, make sure the associated security group allows for SSH connections on port 22.

Install Swift on your instance
==============================

First of all you'll need to be logged in into your session,spawn a terminal an type:

```bash
$ ssh -i <path-to-your-instance-key>.pem ssh://<your-instance-public-dns-address>
```

To install swift on your instance, there is not .deb package yet, but you can do as the [official website](http://swift.org) advises:

1 - install the neccessary tools
-------------------------------

```bash
$ sudo apt-get install clang libicu-dev
```

2 - grab the latest package
--------------------------

```bash
$ wget https://swift.org/builds/ubuntu1404/swift-2.2-SNAPSHOT-2015-12-18-a/swift-2.2-SNAPSHOT-2015-12-18-a-ubuntu14.04.tar.gz
```

3 - open it
----------

```bash
$ tar xzf swift-2.2-SNAPSHOT-2015-12-18-a-ubuntu14.04.tar.gz
$ mv swift-2.2-SNAPSHOT-2015-12-18-a-ubuntu14.04 swift
```

**note :** you can test it by running the REPL with `/home/ubuntu/swift/usr/bin/swift`(you can exit it at any moment by typing `:q`)

Setup your git remote
=====================

To trigger our builds and deploys, we will take full advantage of git's distributed architecture.

1 - create the git repository:
-----------------------------

```bash
$ mkdir -p myproject/remote.git
$ cd my-project/remote.git
$ git init --bare
```

2 - Post-receive hook
--------------------

Now that we have a git repository, we want it to do a few things:

- build the current head.
- kill the previous binary.
- launch the new one.

```bash
$ touch hooks/post-receive
```

then open `hooks/post-receive` in ~~your favourite editor~~ [emacs](https://www.gnu.org/software/emacs/)

```bash
#!/bin/sh

# Variables
PROJECT_PATH=/home/ubuntu/myproject
SWIFT_BIN_PATH=/home/ubuntu/swift

# cleaning up
rm -rf "${PROJECT_PATH}/build""

# exporting current head
git archive -o "${PROJECT_PATH}/master.zip" master

# preparing deflate zone
mkdir "${PROJECT_PATH}/build"

# deflating
unzip "${PROJECT_PATH}/master.zip" -d "${PROJECT_PATH}/build"

# building artifacts
(cd "${PROJECT_PATH}/build" && "${SWIFT_BIN_PATH}/usr/bin/swift" build)

# killing previous entities, without pity
kill -9 `cat /home/ubuntu/myproject/pid.file`

# running artifacts
/home/ubuntu/myproject/build/.build/debug/MyProjectBin $PORT & echo $! > /home/ubuntu/myproject/pid.file
```

3 - Trigger your first deploy
----------------------------

On your local machine, get to your project's directory and do:

```bash
git add remote ec2 ssh://ubuntu@<your-instance-public-dns-address>/home/ubuntu/myproject/remote.git
git push ec2 +master:refs/heads/master
```

This will push the current head to the new remote, which will then run your post-receive hook.
Any time a build passes, the previous instance will be killed and replaced by a new one.

Questions / Remarks ?
=====================

As this was written while actually experimenting with it, it may include a few errors, feel free to tell me if you encounter a difficulty running this "tutorial".
