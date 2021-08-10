FROM centos
RUN yum install nodejs -y
CMD npm run dev