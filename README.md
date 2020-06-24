# pseudo-shop 🛍️

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running the project

Clone the project and navigate to it's directory, run the `yarn dev` command and then open [http://localhost:3000](http://localhost:3000) to view the project.

## Hosting

This Next.js application is hosted on a DigitalOcean droplet running an ubuntu server. The ubuntu server uses Nginx as a webserver and reverse proxy.

### Useful resources:

> [Installing Node.js on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)

> [Ubuntu server initial setup (creating a new user, adding firewall)](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)

> [Installing Nginx on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)

> [Pointing domain registrar to DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars)

> [Set up SSL certificate for Nginx](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)

## Deployment

The deployment for this project is done via a githook which is executed when new code is pushed to the master branch on the git repository located on the ubuntu server. In order to push code to this repository (and subsequently trigger a deployment) the following git remotes should be set.

```
git remote set-url origin git@github.com:enzoborgfrantz/pseudo-shop.git
git remote set-url --add --push origin user@ip:/home/enzo/pseudo-shop.git
git remote set-url --add --push origin git@github.com:enzoborgfrantz/pseudo-shop.git
```

> :warning: Note the **[user]** and **[ip]** values should be replaced with the server user name and the server public ip

More information about how this setup was achieved can be found [here](https://macarthur.me/posts/deploying-code-with-a-git-hook)
<details>
    <summary>post-receive git hook code</summary>
<p>

```bash
#!/bin/bash

# Location of our bare repository.
GIT_DIR="/home/enzo/pseudo-shop.git"

# Where we want to copy our code.
TARGET="/home/enzo/pseudo-shop-deployed"

while read oldrev newrev ref
do
    # Neat trick to get the branch name of the reference just pushed:
    BRANCH=$(git rev-parse --symbolic --abbrev-ref $ref)

    # if [[ $BRANCH == "master" ]];
    #then
        # Send a nice message to the machine pushing to this remote repository.
        echo "Push received! Deploying branch: ${BRANCH}..."

        # "Deploy" the branch we just pushed to a specific directory.
        git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f $BRANCH
   # else 
    #    echo "Branch ${BRANCH} is not master branch. Skipping."
   # fi
   
   # Navigate to where my deployed code lives. 
   cd /home/enzo/pseudo-shop-deployed

   # Install dependencies in production mode.
   npm install
   npm run build
   kill -9 $(lsof -t -i:3000)
   npm run start
done
```
</p>
</details>
