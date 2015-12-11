library(ggplot2)
library(stringr)

setwd("~/Documents/git/cocolab/determiners/experiments/3-free-production/Submiterator-master")

d = read.table("free-production-trials.tsv",sep="\t",header=T)
head(d)
s = read.table("free-production-subject_information.tsv",sep="\t",header=T)
head(s)
d$language = s$language[match(d$workerid,s$workerid)]
summary(d)

d$scene <- as.character(d$scene)

d$noun1 = substr(d$scene,1,1)
d$noun2 = substr(d$scene,3,3)
d$color1 = substr(d$scene,2,2)
d$color2 = substr(d$scene,4,4)
d$noun_num = 1
d[d$noun1==d$noun2,]$noun_num = 2
d$color_num = 1
d[d$color1==d$color2,]$color_num = 2

d$the = 0
d[str_detect(d$response,"the "),]$the = 1
d[str_detect(d$response,"The "),]$the = 1

d$a = 0
d[str_detect(d$response,"a "),]$a = 1
d[str_detect(d$response,"A "),]$a = 1

d$be = 0
d[str_detect(d$response,"is "),]$be = 1
d[str_detect(d$response,"are "),]$be = 1


d$color = 0
d[str_detect(d$response,"blue")|str_detect(d$response,"Blue"),]$color = 1
d[str_detect(d$response,"green")|str_detect(d$response,"Green"),]$color = 1
d[str_detect(d$response,"red")|str_detect(d$response,"Red"),]$color = 1
d[str_detect(d$response,"yellow")|str_detect(d$response,"Yellow"),]$color = 1

d$noun = 0
d[str_detect(d$response,"bird")|str_detect(d$response,"Bird"),]$noun = 1
d[str_detect(d$response,"bug")|str_detect(d$response,"Bug"),]$noun = 1
d[str_detect(d$response,"fish")|str_detect(d$response,"Fish"),]$noun = 1
d[str_detect(d$response,"flower")|str_detect(d$response,"Flower"),]$noun = 1

d_trim2 = d[d$color==1&d$noun==1&d$be==1,]
nrow(d_trim2) # 73 cases
nrow(d_trim2[d_trim2$the==1,]) # 37 cases
nrow(d_trim2[d_trim2$a==1,]) # 31 cases
head(d_trim2)

nrow(d_trim2[d_trim2$noun_num==2&d_trim2$color_num==2,]) # 19 cases
head(d_trim2[d_trim2$noun_num==2&d_trim2$color_num==2,])

ggplot(d, aes(x=scene,fill=response))+
  geom_histogram(position=position_dodge())+
  #facet_wrap(~verb) +
  ylab("count\n")+
  xlab("\nscene")+
  theme_bw()
ggsave("../results/utterance_hist.pdf",height=3.5)



## load in comprehension data

c = read.table("~/Documents/git/cocolab/determiners/experiments/1-infer-scene/Submiterator-master/infer-scene-trials.tsv",sep="\t",header=T)
head(c)
cs = read.table("~/Documents/git/cocolab/determiners/experiments/1-infer-scene/Submiterator-master/infer-scene-subject_information.tsv",sep="\t",header=T)
head(cs)
c$language = cs$language[match(c$workerid,cs$workerid)]
summary(c)

c$choice <- as.character(c$choice)
head(c)

## merge comprehension and production

head(d)
d$verb = "is"
d[nchar(as.character(d$response))==7,]$verb = "not"
d[nchar(as.character(d$response))==5,]$verb = "not"
d$determiner = "A"
d[nchar(as.character(d$response))>5,]$determiner = "The"
d$expt = "production"

head(c)
c$expt = "comprehension"
c$response = paste(c$determiner,"_",c$verb,sep="")
c$scene = c$choice
d$response = paste(d$determiner,"_",d$verb,sep="")
d$choice = d$scene

d = rbind(d,c)
head(d)

# remove 2121 2122 2222 scens from comprehension

d <- subset(d, scene != "2121")
d <- subset(d, scene != "2122")
d <- subset(d, scene != "2222")

ggplot(d, aes(x=scene,fill=response))+
  geom_histogram(position=position_dodge())+
  facet_grid(expt~.,scales="free_y") +
  ylab("count\n")+
  xlab("\nscene")+
  theme_bw()
ggsave("../results/prod_comp_hist.pdf")
