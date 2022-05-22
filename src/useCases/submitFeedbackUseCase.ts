import { MailAdapter } from "../adapters/mailAdapter"
import { FeedbacksRepository } from "../repositories/feedbacksRepository"

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor (
    private feedbackRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute({
    comment,
    type,
    screenshot
  }: SubmitFeedbackUseCaseRequest) {
    await this.feedbackRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'New Feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Feedback Type: ${type}</p>`,
        `<p>Comment: ${comment}</p>`,
        '</div>',
      ].join('\n')
    })
  }
}