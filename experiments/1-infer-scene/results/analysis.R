library(ggplot2)

setwd("~/Documents/git/cocolab/determiners/experiments/1-infer-scene/Submiterator-master")

d = read.table("infer-scene-trials.tsv",sep="\t",header=T)
head(d)
s = read.table("infer-scene-subject_information.tsv",sep="\t",header=T)
head(s)
d$language = s$language[match(d$workerid,s$workerid)]
summary(d)

d$choice <- as.character(d$choice)

ggplot(d, aes(x=choice,fill=determiner))+
  geom_histogram(position=position_dodge())+
  facet_wrap(~verb) +
  ylab("count\n")+
  xlab("\nscene choice")+
  theme_bw()
ggsave("../results/scene_hist.pdf",width=10.5,height=3.5)
