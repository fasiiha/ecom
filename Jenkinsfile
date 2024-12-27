pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'selenium-test-image:latest'
        GITHUB_REPO = 'https://github.com/fasiiha/ecom.git'
    }

    stages {
        stage('Check Docker') {
            steps {
                script {
                    try {
                        bat 'docker info'
                    } catch (Exception e) {
                        error 'Docker is not running. Please start Docker Desktop and try again.'
                    }
                }
            }
        }

        stage('Checkout') {
            steps {
               checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/master']],
                    extensions: [[$class: 'CleanBeforeCheckout']],
                    userRemoteConfigs: [[url: env.GITHUB_REPO]]
                ])
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat 'docker system prune -f'
                    bat "docker build -t ${DOCKER_IMAGE} -f selenium/Dockerfile ."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    bat """
                        docker run --rm ^
                        -v "${WORKSPACE}/selenium:/usr/src/app/selenium" ^
                        ${DOCKER_IMAGE} /bin/sh -c "cd selenium && npm install && npm test"
                    """
                }
            }
        }
    }

    post {
        always {
            script {
                try {
                    bat 'docker system prune -f'
                } catch (Exception e) {
                    echo "Failed to clean up Docker resources: ${e.message}"
                }
            }
            archiveArtifacts artifacts: 'selenium/screenshots/**/*', allowEmptyArchive: true
        }
        failure {
            script {
                echo "Pipeline failed. Checking Docker status..."
                try {
                    bat 'docker info'
                } catch (Exception e) {
                    echo "Docker is not running or not accessible: ${e.message}"
                }
            }
        }
    }
}