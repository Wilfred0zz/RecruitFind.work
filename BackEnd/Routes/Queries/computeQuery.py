from flask import Flask, Blueprint, request, make_response
import psycopg2
from collections import defaultdict
from flask_login import current_user, login_user, logout_user, login_required
import traceback
import os

cptQry = Blueprint('computeQuery', __name__)

@cptQry.route("/api/computeQuery", methods=["POST"])
@login_required
def computeQueryResult():
    try:
        database = psycopg2.connect(user = "bylinkvsjtfdia", password = "b441303bb98c6533e96fa5c476852dcc067180f3a036d5bde62d61e9c5f19d5f", host= os.getenv('DATABASE_IP', "172.17.0.1") , port = "5432", database = "dauhmnvct04jp4")
        if database:
            cursor = database.cursor()
            response = defaultdict(list)
            data = request.get_json()
            skills = []
            candidatesWithDesiredSkills = defaultdict(list)

            if current_user.is_authenticated():

                queryTitle = data['query_title']
                queryDescription = data['query_description']
                queryPayment = data['query_payment']
                queryDate = data['query_date']
                
                desiredSkill1 = data['desired_skill_1']
                desiredSkill2 = data['desired_skill_2']
                desiredSkill3 = data['desired_skill_3']
                desiredSkill4 = data['desired_skill_4']
                desiredSkill5 = data['desired_skill_5']
                desiredSkill6 = data['desired_skill_6']
                desiredSkill7 = data['desired_skill_7']
                desiredSkill8 = data['desired_skill_8']
                desiredSkill9 = data['desired_skill_9']
                desiredSkill10 = data['desired_skill_10']

                skills.insert(0, desiredSkill10)
                skills.insert(0, desiredSkill9)
                skills.insert(0, desiredSkill8)
                skills.insert(0, desiredSkill7)
                skills.insert(0, desiredSkill6)
                skills.insert(0, desiredSkill5)
                skills.insert(0, desiredSkill4)
                skills.insert(0, desiredSkill3)
                skills.insert(0, desiredSkill2)
                skills.insert(0, desiredSkill1)

                skills = filterExistingSkills(skills, cursor)

                currentUserId = current_user.get_id()

                if currentUserId:
                    cursor.execute(f"""SELECT query_id FROM public."Queries" WHERE user_id={currentUserId} AND query_title='{queryTitle}' AND query_description='{queryDescription}' AND query_payment='{queryPayment}' AND query_date='{queryDate}'""")
                    queryID = cursor.fetchone()[0]
                    
                    if queryID:

                        for i in range(len(skills)):
                            
                            if skills[i] == "":
                                continue
                        
                            cursor.execute(f"""SELECT skill_id FROM public."Skills" WHERE skill='{skills[i]}'""")
                            skillID = cursor.fetchone()[0]
                        
                            cursor.execute(f"""SELECT user_id FROM public."Candidate Skills" WHERE skill_id={skillID}""")
                            queryResult = cursor.fetchall()
                            
                            extractedUsers = extractUsersFromQueryResult(queryResult)
                            candidatesWithDesiredSkills[skills[i]].extend(extractedUsers)
                        
                        candidatesAndTheirSkills = checkSkillsOfCandidate(candidatesWithDesiredSkills, cursor)
                        allDesiredCandidatesInfo = getUserInformationFromUserId(candidatesWithDesiredSkills, cursor)
                        numberOfSkillsEachCandidateHas = calculateNumberOfSkillsCandidateHas(candidatesWithDesiredSkills)

                        constructResponse(response, allDesiredCandidatesInfo, numberOfSkillsEachCandidateHas, candidatesAndTheirSkills)

                        checkForMatchedUsersThatRejected(response, cursor)

                        response['query_id'] = queryID
                        if len(response) == 1:
                            response['status_info'] = 'No Results Could Be Found For This Query! This Is Because No User With That Skill Exists Or Because Some Users Are Hidden!'
                        else:
                            print("")


                    else:
                        error = "Query Doesn't Exist! Make Sure Query Was Created Successfully!"
                        response['error'] = error
                        raise Exception(response)
        else:
            error = "Connection To Database Failed!"
            response['error'] = error
            raise Exception(response)

    except Exception:
        print(traceback.format_exc())
        return response, 400

    return response

def extractUsersFromQueryResult(qryResult):
    newQryResult = []

    for i in range(len(qryResult)):
        user = qryResult[i][0]
        newQryResult.insert(0, user)

    newQryResult = newQryResult[::-1]

    return newQryResult


def getUserInformationFromUserId(targetCandidates, db_cursor):
    candidateInfo = []
    candidates = defaultdict(list)
    
    for keys in targetCandidates:
        for candidateId in targetCandidates[keys]:
            if candidateId not in candidates:
                
                db_cursor.execute(f"""SELECT first_name, last_name, email FROM public."Personal Information" WHERE user_id={candidateId}""")
                queryResult = db_cursor.fetchall()[0]
                candidateFirstName = queryResult[0]
                candidateLastName = queryResult[1]
                candidateEmail = queryResult[2]

                db_cursor.execute(f"""SELECT candidate_description FROM public."Candidate Information" WHERE user_id={candidateId}""")
                candidateDescription = db_cursor.fetchone()
        
                if candidateDescription != None:
                    candidateDescription = candidateDescription[0]
                    candidateInfo = []
                    candidateInfo.insert(0, candidateDescription)
                    candidateInfo.insert(0, candidateEmail)
                    candidateInfo.insert(0, candidateLastName)
                    candidateInfo.insert(0, candidateFirstName)
                    candidates[candidateId].extend(candidateInfo)
                else:
                    candidateDescription = ""
                    candidateInfo = []
                    candidateInfo.insert(0, candidateDescription)
                    candidateInfo.insert(0, candidateEmail)
                    candidateInfo.insert(0, candidateLastName)
                    candidateInfo.insert(0, candidateFirstName)
                    candidates[candidateId].extend(candidateInfo)
    
    return candidates


def calculateNumberOfSkillsCandidateHas(targetCandidates):
    candidateNumberOfSkillsTracker = {}

    for keys in targetCandidates:
        for candidateId in targetCandidates[keys]:
            if candidateId not in candidateNumberOfSkillsTracker:
                candidateNumberOfSkillsTracker[candidateId] = 1
            else:
                candidateNumberOfSkillsTracker[candidateId] += 1
    
    return candidateNumberOfSkillsTracker


def constructResponse(rspObj, candidateInfos, candidateNumberOfSkills, candidatesWithSkills):
    length = len(candidateNumberOfSkills)

    for i in range(length):
        v=list(candidateNumberOfSkills.values())
        k=list(candidateNumberOfSkills.keys())
        candidateWithMostSkills = k[v.index(max(v))]

        priorityOfCandidate = str(i+1)
        candidateEmail = candidateInfos[candidateWithMostSkills][2]
        if candidateEmail in candidateInfos[candidateWithMostSkills]:
            candidateInfos[candidateWithMostSkills].append(candidatesWithSkills[candidateEmail])
        rspObj[priorityOfCandidate].extend(candidateInfos[candidateWithMostSkills])
        del candidateNumberOfSkills[candidateWithMostSkills]



def filterExistingSkills(listOfSkills, curr):
    existingSkills = []
    listOfSkills = listOfSkills[::-1]

    for i in range(len(listOfSkills)):
        curr.execute(f"""SELECT skill_id FROM public."Skills" WHERE EXISTS (SELECT skill FROM public."Skills" WHERE skill='{listOfSkills[i]}')""")
        skillID = curr.fetchone()

        if skillID != None:
            existingSkills.insert(0, listOfSkills[i])
        else: 
            continue

    return existingSkills



def checkSkillsOfCandidate(targetedCandidates, curr):
    usersAndTheirSkills = defaultdict(list)
    skills = []

    for keys in targetedCandidates:
        for candidateId in targetedCandidates[keys]:
            curr.execute(f"""SELECT email FROM public."Personal Information" WHERE user_id={candidateId}""")
            candidateEmail = curr.fetchone()[0]
            skills.insert(0, keys)
            usersAndTheirSkills[candidateEmail].append(keys)
    
    return usersAndTheirSkills


def checkForMatchedUsersThatRejected(resObj, curr):
    hiddenUsers = []

    for keys in resObj:
        candidateEmail = resObj[keys][2]
        curr.execute(f"""SELECT user_id FROM public."Personal Information" WHERE email='{candidateEmail}'""")
        candidateId = curr.fetchone()[0]
        curr.execute(f"""SELECT hidden FROM public."Matches" WHERE candidate_id={candidateId} AND query_id={72} AND hidden={True}""")
        hidden = curr.fetchone()
        
        if hidden != None:
            hiddenUsers.insert(0, keys)
        else:
            continue
        
    
    hiddenUsers = hiddenUsers[::-1]

    for i in range(len(hiddenUsers)):
        del resObj[hiddenUsers[i]]



