RMSNorm and Residuals

RMSNorm and residual connections make the repeated block stable. The pattern is: normalize the stream, compute an update, and add the old stream back. RMSNorm controls the scale, and residuals preserve information as the model passes through many layers.

