pipeline {
    agent any  // Runs on any available Jenkins agent

    environment {
        // Load variables from Jenkins or .env file if configured
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                // Fetch code from your repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying application...'
                // Add your deployment commands here
                // e.g., `scp`, `docker`, or `kubectl`
            }
        }
    }

    post {
        success {
            echo ' Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
