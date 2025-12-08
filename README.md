This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## For launching it in AWS EC2:

After launching an EC2 instance and ssh into the instance:

##### 1. Install git and Node

sudo dnf update -y
sudo dnf install -y nodejs git
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs

##### 2. Install dependencies
git clone https://github.com/artamim/BSOD-Frontend.git
cd ~/BSOD-Frontend
rm -rf node_modules .next   # if previous files exists
npm ci                      # now it will succeed without the engine warning
npm run build               # this will now work perfectly

##### 3. Install PM2
sudo npm install -g pm2
sudo pm2 start npm --name "next-app" -- start -- -p 80

##### 4. Make it survive reboots
sudo pm2 startup systemd -u ec2-user --hp /home/ec2-user
sudo pm2 save

##### 5. Check
pm2 status
pm2 logs next-app