#!/bin/bash
# ClayWorks Hetzner Server Setup Script
# Run this on a fresh Ubuntu 22.04 Hetzner server

set -e

echo "=========================================="
echo "ClayWorks Server Setup"
echo "=========================================="

# Update system
echo ">>> Updating system packages..."
apt update && apt upgrade -y

# Install essential packages
echo ">>> Installing essential packages..."
apt install -y \
    curl \
    wget \
    git \
    htop \
    ufw \
    fail2ban \
    unzip \
    apache2-utils

# Install Docker
echo ">>> Installing Docker..."
curl -fsSL https://get.docker.com | sh

# Install Docker Compose plugin
echo ">>> Installing Docker Compose..."
apt install -y docker-compose-plugin

# Enable Docker service
systemctl enable docker
systemctl start docker

# Create deployment user
echo ">>> Creating deploy user..."
useradd -m -s /bin/bash -G docker deploy
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh

# Configure SSH (disable password auth)
echo ">>> Hardening SSH..."
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart sshd

# Configure firewall
echo ">>> Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw --force enable

# Configure fail2ban
echo ">>> Configuring fail2ban..."
systemctl enable fail2ban
systemctl start fail2ban

# Create app directory
echo ">>> Creating app directory..."
mkdir -p /opt/clayworks
chown deploy:deploy /opt/clayworks

# Set up log rotation
echo ">>> Configuring log rotation..."
cat > /etc/logrotate.d/clayworks << 'EOF'
/opt/clayworks/logs/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 deploy deploy
}
EOF

echo "=========================================="
echo "Server setup complete!"
echo ""
echo "NEXT STEPS:"
echo "1. Add your SSH public key to /home/deploy/.ssh/authorized_keys"
echo "2. Clone the repo: su - deploy -c 'git clone <REPO_URL> /opt/clayworks'"
echo "3. Copy .env.production.example to .env.production and configure"
echo "4. Run: docker compose -f docker-compose.prod.yml up -d"
echo "=========================================="
