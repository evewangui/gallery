pipeline {
    agent any
    
    tools {
        nodejs "NodeJS"
    }
    
    environment {
        RENDER_DEPLOY_HOOK = credentials('render-deploy-hook')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    emailext (
                        subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                        body: "Tests failed in build ${env.BUILD_NUMBER}. Check console output at ${env.BUILD_URL}",
                        to: 'your-email@example.com'
                    )
                }
            }
        }
        
        stage('Deploy to Render') {
            steps {
                sh 'curl ${RENDER_DEPLOY_HOOK}'
            }
        }
    }
}