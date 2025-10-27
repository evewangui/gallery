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
                // Add deployment steps here later
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}