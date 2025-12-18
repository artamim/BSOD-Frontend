This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## For launching it in AWS EC2:

After launching an EC2 instance and ssh into the instance:

##### 1. Install git and Node and preparing instance for last instance load and lower image size.

```bash
#!/bin/bash

curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs git
git clone https://github.com/artamim/BSOD-Frontend.git /home/ec2-user/BSOD-Frontend
chown -R ec2-user:ec2-user /home/ec2-user/BSOD-Frontend
cd /home/ec2-user/BSOD-Frontend
sudo npm install -g pm2
sudo pm2 startup systemd -u ec2-user --hp /home/ec2-user | bash
```

##### 2. Install dependencies before instance creation

```bash
#!/bin/bash

cd /home/ec2-user/BSOD-Frontend
sudo -u ec2-user git fetch origin
sudo -u ec2-user git reset --hard origin/main
sudo -u ec2-user npm ci
sudo -u ec2-user npm run build
pm2 restart next-app || pm2 start npm --name "next-app" -- start -- -p 3000
pm2 save
```