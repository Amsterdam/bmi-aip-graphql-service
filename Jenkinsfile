#!groovy

// tag image, push to repo, remove local tagged image
def tag_image_as(tag) {
  script {
    echo "tagging as $tag"
    docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
      image.push(tag)
    }
    sh "docker rmi ${DOCKER_IMAGE_URL}:${tag} || true"
  }
}

def deploy(environment) {
  build job: 'Subtask_Openstack_Playbook',
    parameters: [
            [$class: 'StringParameterValue', name: 'INVENTORY', value: environment],
            [$class: 'StringParameterValue', name: 'PLAYBOOK', value: "${PLAYBOOK}"],
            [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_${PROJECTNAME}"],
            [$class: 'StringParameterValue', name: 'STATIC_CONTAINER', value: "${PROJECTNAME}"],
    ]
}

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block();
    }
    catch (Throwable t) {
        // Disable while developing
        // slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'
        throw t;
    }
    finally {
        if (tearDown) {
            tearDown();
        }
    }
}



pipeline {
  agent any
  environment {
    SERVICE_DOMAIN = "bmi"
    PROJECTNAME = "bmi-aip-graphql-service"
    PLAYBOOK = 'deploy.yml'
    DOCKERFILE = "Dockerfile"
    CONTAINERNAME = "bmi/bmi-aip-graphql-service"
    CONTAINERDIR = "."
    DOCKER_IMAGE_URL = "${DOCKER_REGISTRY_NO_PROTOCOL}/${CONTAINERNAME}"
  }

  stages {
    stage("Checkout") {
      steps {
        checkout scm
        script {
          env.COMMIT_HASH = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
        }
      }
    }

    stage("Lint & test") {
      options {
        timeout(time: 15, unit: 'MINUTES')
      }
      steps {
        script {
          sh "cp .env.example .env"
          sh "bin/npm install"
          sh "bin/npm run build"
          sh "bin/npm run prisma generate"
          sh "bin/npm run ci:lint"
          sh "bin/npm run ci:test"
          // sh "bin/npm run test:e2e"
          // sh "bin/run-build-container chmod -R 777 coverage"
          // sh "bin/run-build-container chmod -R 777 reports"
        }
	  }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'reports/eslint.xml'
          junit allowEmptyResults: true, testResults: 'reports/jest.xml'
        }
      }
    }

    stage("Build docker image") {
      when { anyOf { branch 'acceptance'; branch 'main' } }
      steps {
        tryStep "build", {
          script {
            docker.withRegistry("${DOCKER_REGISTRY_HOST}",'docker_registry_auth') {
                image = docker.build("${DOCKER_IMAGE_URL}:${BUILD_NUMBER}","-f ${DOCKERFILE} --build-arg SERVICE_DOMAIN=${SERVICE_DOMAIN} --build-arg SERVICE_NAME=${PROJECTNAME} ${CONTAINERDIR}")
                image.push()
            }
          }
        }
      }
    }

    stage("Deploy to Acceptance") {
      when { branch 'acceptance' }
      steps {
        tag_image_as("acceptance")
        deploy("acceptance")
      }
    }

    stage("Deploy to production") {
      when { branch 'main' }
      stages {
        stage('notify approval') {
          steps {
            slackSend channel: '#team_bmidms', color: 'warning', message: "${PROJECTNAME} is waiting for Production Release - please confirm"
          }
        }
        stage('Waiting for approval') {
          options {
            timeout(time: 6, unit: 'HOURS')
          }
          input {
            message "Deploy to Production?"
            ok "Yes, deploy it!"
          }
          steps {
            tag_image_as("production")
            deploy("production")
          }
        }
      }
    }
  }

  post {
    always {
      script {
        // delete original image built on the build server
        sh "docker rmi ${DOCKER_IMAGE_URL}:${BUILD_NUMBER} || true"
        sh "bin/run-build-container rm -rf node_modules"
      }
    }
  }
}
