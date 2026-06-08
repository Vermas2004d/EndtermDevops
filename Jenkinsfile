pipeline{
    agent any

    triggers{
        pollSCM "H/2 * * * *"
    }

    tools{
        nodejs "NODE22"
    }

    environment{
        DOCKER_IMAGE = 'vermas2012d/etp_jenkins'
        DOCKER_TAG = "latest"
        CONTAINER_NAME = 'etp_jenkins'
        PORT = 4000
    }

    stages{
        stage("Clone")
        {
            steps{
                git url : "githubrepo",
                branch: "main"
            }
        }

        stage("Install all dependencies")
        {
            steps{
                sh "npm install"
            }   
        }

        stage("build the docker image")
        {
            steps{
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage( "Checking the image history that i can find if any malicious thing happen in it..")
         steps{
            sh "docker history ${DOCKER_IMAGE}:${DOCKER_TAG}"
        }

        stage("push the docker image on the docker hub")
        {
            steps{
                withCredentials([
                    usernamePassword(
                        credentialsId:'dockerhub',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: "DOCKER_PASSWORD"
                    )
                ]){
                    sh """ 
                        echo "$DOCKER_USERNAME" | docker login -u "$DOCKER_PASSWORD" --passwd--stdin
                    """
                }
            }
        }

        stage("Remove the old container")
        {
            steps{
                sh "docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage("Again making the new container with same name")
        {
            steps{
                sh """ docker run -d \
                  -p ${PORT}:4000 \
                   --name ${CONTAINER_NAME} \
                   ${DOCKER_IMAGE}:${DOCKER_TAG} \
                    """
            }
        }
    }

    post{
        success{
            echo "pipeline successfully build"
        }

        failure{
            echo "pipeline failed, check errors"
        }

    }
}