import { FeedbackCreateData, FeedbacksRepository } from "../feedbacksRepository"
import { prima } from "../../prisma"

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({
    comment,
    type,
    screenshot
  }: FeedbackCreateData) {
    await prima.feedback.create({
      data: {
        type,
        comment,
        screenshot
      }
    })
  }
}