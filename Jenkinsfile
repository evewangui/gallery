pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                git branch: 'master',
                    url: 'https://github.com/evewangui/gallery.git'
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
                sh 'npm test || echo "No tests specified"'
            }
        }

        stage('Build') {
            steps {
                echo 'Building application...'
                sh 'npm run build || echo "No build script specified"'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment stage - to be configured'
            }
        }
    }

    post {
        success {
            withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_WEBHOOK')]) {
                sh """
                curl -s -X POST -H 'Content-type: application/json' \\
                  --data '{ "text": "✅ Build Succeeded: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${env.BUILD_URL}" }' \\
                  "$SLACK_WEBHOOK"
                """
            }
        }
        failure {
            withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_WEBHOOK')]) {
                sh """
                curl -s -X POST -H 'Content-type: application/json' \\
                  --data '{ "text": "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${env.BUILD_URL}" }' \\
                  "$SLACK_WEBHOOK"
                """
            }
        }
    }
}
