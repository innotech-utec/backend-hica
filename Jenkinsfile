pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'  // Asegúrate de que este nombre coincida con tu instalación de Node.js en Jenkins
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
        
        stage('Run Serve') {
            steps {
                sh 'npm run dev &'
                sh 'sleep 10'  // Espera 10 segundos para que el servidor inicie
            }
        }
    }
    
    post {
        always {
            sh 'pkill -f "npm run serve" || true'
        }
    }
}
