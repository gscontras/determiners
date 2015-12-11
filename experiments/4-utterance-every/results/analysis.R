library(ggplot2)

setwd("~/Documents/git/cocolab/determiners/experiments/2-choose-utterance/Submiterator-master")

d = read.table("choose-utterance-trials.tsv",sep="\t",header=T)
head(d)
s = read.table("choose-utterance-subject_information.tsv",sep="\t",header=T)
head(s)
d$language = s$language[match(d$workerid,s$workerid)]
summary(d)

d$scene <- as.character(d$scene)

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
